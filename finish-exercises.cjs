const fs = require("fs");

const files = ["exercises.js", "src/pages/Gym.jsx"];

const groups = {
  "Chest": {
    equipment: ["Dumbbells", "Barbell", "Cable Machine", "Machine", "Resistance Band", "Bodyweight"],
    movements: [
      "Dumbbell Press", "Incline Press", "Decline Press", "Floor Press",
      "Squeeze Press", "Cable Fly", "Incline Fly", "Decline Fly",
      "Single-Arm Press", "Chest Press", "Paused Press", "Tempo Press",
      "Wide-Grip Press", "Neutral-Grip Press", "Standing Cable Press",
      "Kneeling Cable Press", "Resistance Band Press", "Push-Up",
      "Incline Push-Up", "Decline Push-Up", "Explosive Push-Up",
      "Archer Push-Up", "Tempo Push-Up", "Close-Grip Push-Up",
      "Machine Fly", "Plate Press", "Landmine Press"
    ]
  },
  "Back": {
    equipment: ["Dumbbells", "Barbell", "Cable Machine", "Machine", "Resistance Band", "Bodyweight"],
    movements: [
      "Bent-Over Row", "Single-Arm Row", "Chest-Supported Row",
      "Seated Cable Row", "Wide-Grip Row", "Close-Grip Row",
      "Underhand Row", "T-Bar Row", "Meadows Row", "Pendlay Row",
      "Lat Pulldown", "Neutral-Grip Pulldown", "Straight-Arm Pulldown",
      "Pull-Up", "Chin-Up", "Assisted Pull-Up", "Scapular Pull-Up",
      "Machine High Row", "Machine Low Row", "Cable Pullover",
      "Dumbbell Pullover", "Barbell Shrug", "Dumbbell Shrug",
      "Rack Pull", "Back Extension", "Reverse Fly"
    ]
  },
  "Shoulders": {
    equipment: ["Dumbbells", "Barbell", "Cable Machine", "Machine", "Resistance Band", "Bodyweight"],
    movements: [
      "Shoulder Press", "Arnold Press", "Z Press", "Push Press",
      "Lateral Raise", "Leaning Lateral Raise", "Cable Lateral Raise",
      "Front Raise", "Plate Front Raise", "Rear Delt Fly",
      "Reverse Pec Deck", "Face Pull", "Upright Row", "Y Raise",
      "Landmine Press", "Overhead Press", "Single-Arm Press",
      "Wall Slide", "Band Pull-Apart", "External Rotation"
    ]
  },
  "Biceps": {
    equipment: ["Dumbbells", "Barbell", "EZ Bar", "Cable Machine", "Machine", "Resistance Band"],
    movements: [
      "Alternating Curl", "Hammer Curl", "Cross-Body Hammer Curl",
      "Concentration Curl", "Preacher Curl", "Spider Curl",
      "Incline Curl", "Bayesian Curl", "Cable Curl", "High Cable Curl",
      "Reverse Curl", "Zottman Curl", "Drag Curl", "Machine Curl",
      "Wrist-Supported Curl", "Isometric Curl Hold"
    ]
  },
  "Triceps": {
    equipment: ["Dumbbells", "Barbell", "EZ Bar", "Cable Machine", "Machine", "Resistance Band", "Bodyweight"],
    movements: [
      "Rope Pushdown", "V-Bar Pushdown", "Reverse-Grip Pushdown",
      "Overhead Extension", "Single-Arm Extension", "Skull Crusher",
      "Rolling Extension", "Tate Press", "Close-Grip Floor Press",
      "Bench Dip", "Diamond Push-Up", "Cable Kickback",
      "Dumbbell Kickback", "JM Press", "Band Pushdown"
    ]
  },
  "Quadriceps": {
    equipment: ["Dumbbells", "Barbell", "Machine", "Bodyweight", "Smith Machine", "Leg Press"],
    movements: [
      "Front Squat", "Goblet Squat", "Hack Squat", "Split Squat",
      "Bulgarian Split Squat", "Walking Lunge", "Reverse Lunge",
      "Forward Lunge", "Lateral Lunge", "Step-Up", "Lateral Step-Up",
      "Leg Extension", "Single-Leg Leg Press", "Narrow-Stance Leg Press",
      "Heel-Elevated Squat", "Wall Sit", "Cyclist Squat",
      "Smith Machine Squat", "Box Squat", "Tempo Squat"
    ]
  },
  "Hamstrings & Glutes": {
    equipment: ["Dumbbells", "Barbell", "Machine", "Cable Machine", "Bodyweight", "Resistance Band", "Kettlebell"],
    movements: [
      "Romanian Deadlift", "Single-Leg Romanian Deadlift",
      "Stiff-Leg Deadlift", "Good Morning", "Hip Thrust",
      "Single-Leg Hip Thrust", "Glute Bridge", "Single-Leg Glute Bridge",
      "Cable Pull-Through", "Cable Glute Kickback", "Seated Leg Curl",
      "Lying Leg Curl", "Standing Leg Curl", "Nordic Curl",
      "Stability Ball Leg Curl", "Frog Pump", "Reverse Hyperextension",
      "Back Extension", "Kettlebell Deadlift", "Dumbbell Deadlift"
    ]
  },
  "Calves": {
    equipment: ["Dumbbells", "Machine", "Bodyweight", "Smith Machine", "Leg Press", "Resistance Band"],
    movements: [
      "Standing Calf Raise", "Seated Calf Raise", "Single-Leg Calf Raise",
      "Donkey Calf Raise", "Leg Press Calf Raise", "Smith Machine Calf Raise",
      "Bent-Knee Calf Raise", "Calf Raise on Step", "Tibialis Raise",
      "Wall Tibialis Raise", "Resistance Band Plantar Flexion",
      "Single-Leg Seated Calf Raise"
    ]
  },
  "Abs & Core": {
    equipment: ["Bodyweight", "Cable Machine", "Dumbbells", "Medicine Ball", "Ab Wheel", "Stability Ball"],
    movements: [
      "Plank", "Side Plank", "Weighted Plank", "Dead Bug", "Bird Dog",
      "Hollow Body Hold", "Reverse Crunch", "Bicycle Crunch",
      "Toe Touch Crunch", "V-Up", "Flutter Kicks", "Scissor Kicks",
      "Hanging Knee Raise", "Hanging Leg Raise", "Cable Crunch",
      "Ab Wheel Rollout", "Pallof Press", "Russian Twist",
      "Cable Wood Chop", "Mountain Climber", "Stability Ball Crunch",
      "Weighted Sit-Up", "Suitcase Carry", "Bear Plank Shoulder Tap"
    ]
  },
  "Forearms & Grip": {
    equipment: ["Dumbbells", "Barbell", "Cable Machine", "Bodyweight", "Resistance Band"],
    movements: [
      "Wrist Curl", "Reverse Wrist Curl", "Farmer's Carry",
      "Dead Hang", "Towel Hang", "Plate Pinch Hold",
      "Barbell Static Hold", "Heavy Dumbbell Hold", "Finger Curl",
      "Finger Extension", "Wrist Roller", "Wrist Pronation",
      "Wrist Supination", "Reverse EZ-Bar Wrist Curl"
    ]
  },
  "Full Body": {
    equipment: ["Dumbbells", "Barbell", "Kettlebell", "Bodyweight", "Medicine Ball", "Weighted Sled"],
    movements: [
      "Burpee", "Squat Thrust", "Bear Crawl", "Inchworm",
      "Dumbbell Snatch", "Power Clean", "Hang Clean", "Clean and Jerk",
      "Dumbbell Thruster", "Kettlebell High Pull", "Kettlebell Swing",
      "Man Maker", "Devil Press", "Jump Squat", "Skater Jump",
      "Medicine Ball Slam", "Medicine Ball Chest Pass", "Sled Push",
      "Sled Drag", "Battle Rope Waves", "Turkish Get-Up",
      "Kettlebell Goblet Squat", "Dumbbell Farmer Walk"
    ]
  }
};

function findArray(source) {
  const start = source.search(/const\s+exercises\s*=\s*\[/);
  if (start < 0) throw new Error("Could not find exercises array");

  const open = source.indexOf("[", start);
  let depth = 0, quote = null, escape = false;

  for (let i = open; i < source.length; i++) {
    const c = source[i];

    if (quote) {
      if (escape) escape = false;
      else if (c === "\\") escape = true;
      else if (c === quote) quote = null;
      continue;
    }

    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        let end = i + 1;
        if (source[end] === ";") end++;
        return {start, end};
      }
    }
  }

  throw new Error("Exercise array is not closed correctly");
}

const entryRegex =
  /\{\s*name\s*:\s*"([^"]+)"\s*,\s*muscle\s*:\s*"([^"]+)"\s*,\s*equipment\s*:\s*"([^"]+)"\s*\}/g;

const originals = files.map(file => {
  const source = fs.readFileSync(file, "utf8");
  const bounds = findArray(source);
  const arrayText = source.slice(bounds.start, bounds.end);
  const entries = [...arrayText.matchAll(entryRegex)].map(m => ({
    name: m[1], muscle: m[2], equipment: m[3]
  }));

  if (entries.length < 50) {
    throw new Error(`${file}: found only ${entries.length} entries; stopping safely`);
  }

  return {file, source, bounds, entries};
});

const exercises = originals[0].entries;
const seen = new Set(exercises.map(e => e.name.toLowerCase()));

for (const [muscle, group] of Object.entries(groups)) {
  for (const movement of group.movements) {
    for (const equipment of group.equipment) {
      const name = `${movement} (${equipment})`;
      const key = name.toLowerCase();

      if (seen.has(key)) continue;
      seen.add(key);
      exercises.push({name, muscle, equipment});
    }
  }
}

if (exercises.length < 250) {
  throw new Error(`Generated only ${exercises.length} exercises. No files changed.`);
}

const replacement = [
  "const exercises = [",
  ...exercises.map(e =>
    `  { name: ${JSON.stringify(e.name)}, muscle: ${JSON.stringify(e.muscle)}, equipment: ${JSON.stringify(e.equipment)} },`
  ),
  "];"
].join("\n");

const updates = originals.map(item =>
  item.source.slice(0, item.bounds.start) +
  replacement +
  item.source.slice(item.bounds.end)
);

// Validate both files before writing either.
for (const [index, updated] of updates.entries()) {
  const match = updated.match(/const exercises\s*=\s*\[([\s\S]*?)\n\];/);
  const count = match ? [...match[1].matchAll(entryRegex)].length : 0;
  if (count !== exercises.length) {
    throw new Error(`Validation failed for ${files[index]}: ${count} entries`);
  }
}

for (let i = 0; i < files.length; i++) {
  fs.writeFileSync(files[i], updates[i]);
}

console.log(`SUCCESS: ${exercises.length} unique exercise entries integrated.`);
console.log("Updated exercises.js and Gym.jsx.");
console.log("Other Gym page code was preserved.");
