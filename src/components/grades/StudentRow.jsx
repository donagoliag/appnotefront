const StudentRow = ({ student, currentSemestre, isRecap, getInitials, getPercentageClass, getGradeClass, getAlertIcon, onEdit, onDelete, onConsult }) => {
  if (!student || !student.semesters) {
    return null;
  }

  const semData = isRecap
    ? (student.semesters[1] && student.semesters[2]
      ? {
        percentage: Math.round((student.semesters[1].percentage + student.semesters[2].percentage) / 2),
        moyenne: ((student.semesters[1].moyenne + student.semesters[2].moyenne) / 2).toFixed(1)
      }
      : null)
    : student.semesters[currentSemestre];

  if (!semData) return null;

  return (
    <tr className="hover:bg-white/5 transition-colors">
      {/* Left - Student Info */}
      <td className="px-4 py-4 border-b border-white/5 sticky left-0 bg-black/30 backdrop-blur-3xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {getInitials(student.name)}
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{student.name}</div>
            <div className="text-white/80 text-xs">{student.matricule}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-4 border-b border-white/5 sticky left-[280px] bg-black/30 backdrop-blur-3xl">
        <span className={`inline-block px-3 py-1.5 rounded-lg font-bold text-xs ${getPercentageClass(semData.percentage)}`}>
          {semData.percentage}%
        </span>
      </td>
      <td className="px-4 py-4 border-b border-white/5 sticky left-[380px] bg-black/30 backdrop-blur-3xl font-semibold text-white">
        {semData.moyenne}/20
      </td>
      <td className="px-4 py-4 border-b border-white/5 text-center sticky left-[480px] bg-black/30 backdrop-blur-3xl">
        {getAlertIcon(semData.percentage)}
      </td>

      {/* Middle - Grades */}
      {isRecap ? (
        <>
          <td className="px-4 py-4 border-b border-white/5 text-center font-semibold">
            {student.semesters[1].percentage}%
          </td>
          <td className="px-4 py-4 border-b border-white/5 text-center font-semibold">
            {student.semesters[1].moyenne}
          </td>
          <td className="px-4 py-4 border-b border-white/5 text-center font-semibold">
            {student.semesters[2].percentage}%
          </td>
          <td className="px-4 py-4 border-b border-white/5 text-center font-semibold">
            {student.semesters[2].moyenne}
          </td>
          <td className="px-4 py-4 border-b border-white/5 text-center font-semibold">
            {semData.percentage}%
          </td>
          <td className="px-4 py-4 border-b border-white/5 text-center font-semibold">
            {semData.moyenne}
          </td>
        </>
      ) : (
        student.semesters[currentSemestre]?.ues?.map(ue =>
          ue.ecues.map((ecue, idx) => (
            <td
              key={`${ue.name}-${idx}`}
              className={`px-4 py-4 border-b border-white/5 text-center font-semibold ${getGradeClass(ecue.note)}`}
            >
              {ecue.note}
            </td>
          ))
        )
      )}

      {/* Right - Actions */}
      {!isRecap && (
        <td className="px-4 py-4 border-b border-white/5 sticky right-0 bg-black/30 backdrop-blur-3xl">
          <div className="flex gap-1.5">
            <button
              onClick={() => onConsult(student)}
              className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-1 text-white whitespace-nowrap"
            >
              <i className="fas fa-eye"></i>
              Consulter
            </button>
            <button
              onClick={() => onEdit(student)}
              className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-xs font-semibold hover:bg-white/20 transition-all flex items-center gap-1 text-white whitespace-nowrap"
            >
              <i className="fas fa-edit"></i>
              Modifier
            </button>
            <button
              onClick={() => onDelete(student)}
              className="px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-xs font-semibold hover:bg-red-500/20 transition-all flex items-center gap-1 text-red-400 whitespace-nowrap"
            >
              <i className="fas fa-trash"></i>
              Supprimer
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default StudentRow;