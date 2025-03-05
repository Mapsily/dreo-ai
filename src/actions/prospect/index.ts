"use server";

import { parse } from "csv-parse/sync";
import * as XLSX from "xlsx";
import { predictFields } from "@/lib/utils";
import { client } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getPropects = async (clerkId: string) => {
  try {
    const prospects = await client.prospect.findMany({
      where: {
        user: {
          clerkId,
        },
      },
    });
    return { status: 200, data: prospects };
  } catch (error) {
    return { status: 500, error: "Error fetching prospects" };
  }
};

export const addProspects = async (data: Prisma.ProspectCreateManyInput[]) => {
  try {
    await client.prospect.createMany({ data });
    revalidatePath("/dashboard/prospects");
    return { status: 200, message: "Prospects added" };
  } catch (error) {
    return { status: 500, error: "Error adding prospects" };
  }
};

export const deleteProspect = async (prospectId: string) => {
  try {
    await client.conversation.deleteMany({
      where: {
        prospectId,
      },
    });
    await client.appointment.deleteMany({
      where: {
        prospectId,
      },
    });
    await client.prospect.delete({ where: { id: prospectId } });
    revalidatePath("/dashboard/prospects");
    return { status: 200, message: "Prospect deleted" };
  } catch (error) {
    return { status: 500, error: "Error deleting prospect" };
  }
};

export const updateProspect = async (
  prospectId: string,
  updates: Prisma.ProspectUpdateInput
) => {
  try {
    await client.prospect.update({
      where: {
        id: prospectId,
      },
      data: updates,
    });
    revalidatePath("/dashboard/prospects");
    return { status: 200, message: "Prospect updated" };
  } catch (error) {
    return { status: 500, error: "Error updating prospect" };
  }
};

export async function uploadProspects(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) return { status: 200, message: "File is required" };

  const buffer = Buffer.from(await file.arrayBuffer());

  let data: Record<string, any>[];
  if (file.name.endsWith(".csv")) {
    data = parse(buffer, { columns: true, skip_empty_lines: true });
  } else if (file.name.endsWith(".xlsx")) {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(sheet);
  } else {
    return { status: 200, message: "Unsupported file" };
  }
  const predictedData = await predictFields(data);
  return { status: 200, data: predictedData };
}
