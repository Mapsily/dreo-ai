const LevelView = ({ level }: { level: string }) => {
  return (
    <div className="w-fit bg-background p-1 px-2 rounded-md text-xs font-medium">
      {level === "LOW" ? (
        <p className="text-gray-800">LOW</p>
      ) : level === "MEDIUM" ? (
        <p className="text-orange-400">MEDIUM</p>
      ) : (
        <p className="text-green-400">HIGH</p>
      )}
    </div>
  );
};
export default LevelView;
