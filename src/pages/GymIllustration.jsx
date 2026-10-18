import React from "react";

const muscleColors = {
  Chest: ["#F28B82", "#FDE2E0"],
  Back: ["#8EADFF", "#E0E9FF"],
  Shoulders: ["#F6BD60", "#FFF0D2"],
  Biceps: ["#B39DDB", "#EEE5FA"],
  Triceps: ["#80CBC4", "#DDF5F0"],
  Quadriceps: ["#F48FB1", "#FCE4EC"],
  "Hamstrings & Glutes": ["#90CAF9", "#E3F2FD"],
  Calves: ["#A5D6A7", "#E8F5E9"],
  "Abs & Core": ["#FFCC80", "#FFF3E0"],
  "Forearms & Grip": ["#B0BEC5", "#ECEFF1"],
};

export default function GymIllustration({ muscle = "Chest" }) {
  const [active, pale] = muscleColors[muscle] || muscleColors.Chest;

  return (
    <div className="gym-anatomy-illustration" role="img" aria-label={`${muscle} muscle illustration`}>
      <svg viewBox="0 0 240 240" width="100%" height="190" aria-hidden="true">
        <circle cx="120" cy="27" r="17" fill="#E9C3A8" />
        <path d="M103 47 Q83 48 72 65 L48 105 Q43 114 52 118 Q60 121 65 111 L86 81 L91 128 L82 181 Q80 193 92 194 Q102 194 105 181 L119 139 L135 181 Q138 194 149 191 Q159 188 155 177 L148 127 L153 81 L175 112 Q181 122 189 117 Q197 112 190 102 L168 64 Q158 48 137 47 Z" fill="#E9C3A8" stroke="#9A7867" strokeWidth="1.5" />
        <path d="M103 49 Q120 56 137 49 L145 76 L120 91 L95 76 Z" fill={muscle === "Back" ? active : pale} stroke="#9A7867" strokeWidth="1.3" />
        <path d="M96 76 Q106 68 118 80 L116 105 Q104 111 94 96 Z" fill={muscle === "Chest" ? active : pale} stroke="#9A7867" strokeWidth="1.2" />
        <path d="M122 80 Q134 68 144 76 L146 96 Q136 111 124 105 Z" fill={muscle === "Chest" ? active : pale} stroke="#9A7867" strokeWidth="1.2" />
        <path d="M96 108 Q120 115 144 108 L143 133 L120 140 L97 133 Z" fill={muscle === "Abs & Core" ? active : pale} stroke="#9A7867" strokeWidth="1.2" />
        <path d="M88 82 L67 111 L59 108 L78 73 Z" fill={muscle === "Shoulders" || muscle === "Biceps" ? active : pale} />
        <path d="M152 82 L173 111 L181 108 L162 73 Z" fill={muscle === "Shoulders" || muscle === "Biceps" ? active : pale} />
        <path d="M92 139 L111 142 L104 179 L91 179 Z" fill={muscle === "Quadriceps" || muscle === "Hamstrings & Glutes" ? active : pale} stroke="#9A7867" strokeWidth="1.2" />
        <path d="M129 142 L148 139 L149 179 L136 179 Z" fill={muscle === "Quadriceps" || muscle === "Hamstrings & Glutes" ? active : pale} stroke="#9A7867" strokeWidth="1.2" />
        <path d="M91 180 L104 180 L101 213 L91 213 Z" fill={muscle === "Calves" ? active : pale} stroke="#9A7867" strokeWidth="1.2" />
        <path d="M136 180 L149 180 L149 213 L139 213 Z" fill={muscle === "Calves" ? active : pale} stroke="#9A7867" strokeWidth="1.2" />
        <path d="M79 113 L66 145 L59 141 L68 111 Z" fill={muscle === "Forearms & Grip" || muscle === "Biceps" || muscle === "Triceps" ? active : pale} />
        <path d="M161 113 L174 145 L181 141 L172 111 Z" fill={muscle === "Forearms & Grip" || muscle === "Biceps" || muscle === "Triceps" ? active : pale} />
        <path d="M95 78 Q120 91 145 78" fill="none" stroke="#9A7867" strokeWidth="1.2" />
      </svg>
      <strong>{muscle}</strong>
      <span>Target muscle group</span>
    </div>
  );
}
