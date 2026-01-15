/**
 * ToeflScoreRanges Component
 * Menampilkan informasi range skor TOEFL
 */

import { Badge } from "@/components/ui/badge";
import { getToeflScoreRanges } from "../utils/examData";

const ToeflScoreRanges = () => {
  const ranges = getToeflScoreRanges();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Interpretasi Skor TOEFL ITP</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ranges.map((range) => (
          <Badge
            key={range.range}
            variant="outline"
            className={`py-3 px-4 justify-center text-center ${range.color}`}
          >
            <div>
              <p className="font-bold">{range.range}</p>
              <p className="text-xs font-normal">{range.level}</p>
            </div>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ToeflScoreRanges;
