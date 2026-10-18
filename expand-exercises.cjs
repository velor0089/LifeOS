const fs = require("fs");

const dataFile = "exercises.js";
const gymFile = "src/pages/Gym.jsx";

const data = fs.readFileSync(dataFile, "utf8");
const gym = fs.readFileSync(gymFile, "utf8");

const categories = [
  ["Chest", "Dumbbell Floor Press", "Dumbbells"],
  ["Chest", "Single-Arm Dumbbell Bench Press", "Dumbbells"],
  ["Chest", "Paused Barbell Bench Press", "Barbell"],
  ["Chest", "Close-Grip Dumbbell Press", "Dumbbells"],
  ["Chest", "Cable Crossover", "Cable Machine"],
  ["Chest", "Standing Resistance Band Fly", "Resistance Band"],
  ["Chest", "Kneeling Push-Up", "Bodyweight"],
  ["Chest", "Archer Push-Up", "Bodyweight"],
  ["Chest", "Explosive Push-Up", "Bodyweight"],
  ["Chest", "Incline Smith Machine Press", "Smith Machine"],
  ["Chest", "Decline Smith Machine Press", "Smith Machine"],
  ["Chest", "Plate-Loaded Chest Press", "Machine"],
  ["Chest", "Single-Arm Machine Chest Press", "Machine"],
  ["Chest", "Low Cable Crossover", "Cable Machine"],
  ["Chest", "Standing Plate Squeeze Press", "Weight Plate"],

  ["Back", "Pendlay Row", "Barbell"],
  ["Back", "T-Bar Row", "T-Bar"],
  ["Back", "Chest-Supported Row", "Machine"],
  ["Back", "Single-Arm Cable Row", "Cable Machine"],
  ["Back", "Seated Wide-Grip Row", "Cable Machine"],
  ["Back", "Underhand Barbell Row", "Barbell"],
  ["Back", "Dumbbell Seal Row", "Dumbbells"],
  ["Back", "Meadows Row", "Landmine"],
  ["Back", "Machine High Row", "Machine"],
  ["Back", "Assisted Pull-Up", "Assisted Machine"],
  ["Back", "Neutral-Grip Pull-Up", "Pull-Up Bar"],
  ["Back", "Scapular Pull-Up", "Pull-Up Bar"],
  ["Back", "Resistance Band Row", "Resistance Band"],
  ["Back", "Dumbbell Shrug", "Dumbbells"],
  ["Back", "Barbell Shrug", "Barbell"],

  ["Shoulders", "Arnold Press", "Dumbbells"],
  ["Shoulders", "Seated Dumbbell Shoulder Press", "Dumbbells"],
  ["Shoulders", "Machine Shoulder Press", "Machine"],
  ["Shoulders", "Cable Lateral Raise", "Cable Machine"],
  ["Shoulders", "Leaning Dumbbell Lateral Raise", "Dumbbells"],
  ["Shoulders", "Front Plate Raise", "Weight Plate"],
  ["Shoulders", "Cable Front Raise", "Cable Machine"],
  ["Shoulders", "Reverse Pec Deck", "Machine"],
  ["Shoulders", "Cable Rear Delt Fly", "Cable Machine"],
  ["Shoulders", "Face Pull", "Cable Machine"],
  ["Shoulders", "Barbell Push Press", "Barbell"],
  ["Shoulders", "Dumbbell Y-Raise", "Dumbbells"],
  ["Shoulders", "Landmine Press", "Landmine"],
  ["Shoulders", "Resistance Band Pull-Apart", "Resistance Band"],
  ["Shoulders", "Handstand Hold", "Bodyweight"],

  ["Biceps", "Alternating Dumbbell Curl", "Dumbbells"],
  ["Biceps", "Concentration Curl", "Dumbbells"],
  ["Biceps", "Preacher Curl", "EZ Bar"],
  ["Biceps", "Machine Preacher Curl", "Machine"],
  ["Biceps", "Cable Bayesian Curl", "Cable Machine"],
  ["Biceps", "Incline Hammer Curl", "Dumbbells"],
  ["Biceps", "Cross-Body Hammer Curl", "Dumbbells"],
  ["Biceps", "Reverse-Grip EZ Bar Curl", "EZ Bar"],
  ["Biceps", "Spider Curl", "Dumbbells"],
  ["Biceps", "Resistance Band Curl", "Resistance Band"],

  ["Triceps", "EZ-Bar Skull Crusher", "EZ Bar"],
  ["Triceps", "Overhead Cable Triceps Extension", "Cable Machine"],
  ["Triceps", "Single-Arm Cable Pushdown", "Cable Machine"],
  ["Triceps", "Close-Grip Push-Up", "Bodyweight"],
  ["Triceps", "Bench Dip", "Bench"],
  ["Triceps", "Dumbbell Tate Press", "Dumbbells"],
  ["Triceps", "Cable Kickback", "Cable Machine"],
  ["Triceps", "Lying Dumbbell Triceps Extension", "Dumbbells"],
  ["Triceps", "JM Press", "Barbell"],
  ["Triceps", "Resistance Band Pushdown", "Resistance Band"],

  ["Quadriceps", "Front Squat", "Barbell"],
  ["Quadriceps", "Goblet Squat", "Dumbbells"],
  ["Quadriceps", "Hack Squat", "Machine"],
  ["Quadriceps", "Sissy Squat", "Bodyweight"],
  ["Quadriceps", "Leg Extension", "Machine"],
  ["Quadriceps", "Bulgarian Split Squat", "Dumbbells"],
  ["Quadriceps", "Heel-Elevated Squat", "Dumbbells"],
  ["Quadriceps", "Smith Machine Squat", "Smith Machine"],
  ["Quadriceps", "Step-Up", "Bench"],
  ["Quadriceps", "Reverse Lunge", "Bodyweight"],
  ["Quadriceps", "Walking Lunge", "Dumbbells"],
  ["Quadriceps", "Belt Squat", "Belt Squat Machine"],

  ["Hamstrings & Glutes", "Romanian Deadlift", "Barbell"],
  ["Hamstrings & Glutes", "Single-Leg Romanian Deadlift", "Dumbbells"],
  ["Hamstrings & Glutes", "Barbell Hip Thrust", "Barbell"],
  ["Hamstrings & Glutes", "Glute Bridge", "Bodyweight"],
  ["Hamstrings & Glutes", "Single-Leg Glute Bridge", "Bodyweight"],
  ["Hamstrings & Glutes", "Seated Leg Curl", "Machine"],
  ["Hamstrings & Glutes", "Lying Leg Curl", "Machine"],
  ["Hamstrings & Glutes", "Nordic Hamstring Curl", "Bodyweight"],
  ["Hamstrings & Glutes", "Cable Pull-Through", "Cable Machine"],
  ["Hamstrings & Glutes", "Good Morning", "Barbell"],
  ["Hamstrings & Glutes", "45-Degree Back Extension", "Bench"],
  ["Hamstrings & Glutes", "Frog Pump", "Bodyweight"],

  ["Calves", "Seated Calf Raise", "Machine"],
  ["Calves", "Standing Calf Raise", "Machine"],
  ["Calves", "Single-Leg Calf Raise", "Bodyweight"],
  ["Calves", "Leg Press Calf Press", "Leg Press"],
  ["Calves", "Donkey Calf Raise", "Machine"],
  ["Calves", "Smith Machine Calf Raise", "Smith Machine"],
  ["Calves", "Dumbbell Calf Raise", "Dumbbells"],
  ["Calves", "Tibialis Raise", "Bodyweight"],

  ["Abs & Core", "Plank", "Bodyweight"],
  ["Abs & Core", "Side Plank", "Bodyweight"],
  ["Abs & Core", "Dead Bug", "Bodyweight"],
  ["Abs & Core", "Hanging Knee Raise", "Pull-Up Bar"],
  ["Abs & Core", "Hanging Leg Raise", "Pull-Up Bar"],
  ["Abs & Core", "Cable Crunch", "Cable Machine"],
  ["Abs & Core", "Ab Wheel Rollout", "Ab Wheel"],
  ["Abs & Core", "Pallof Press", "Cable Machine"],
  ["Abs & Core", "Bicycle Crunch", "Bodyweight"],
  ["Abs & Core", "Reverse Crunch", "Bodyweight"],
  ["Abs & Core", "Russian Twist", "Medicine Ball"],
  ["Abs & Core", "Mountain Climber", "Bodyweight"],
  ["Abs & Core", "Weighted Sit-Up", "Weight Plate"],
  ["Abs & Core", "Hollow Body Hold", "Bodyweight"],

  ["Forearms & Grip", "Wrist Curl", "Dumbbells"],
  ["Forearms & Grip", "Reverse Wrist Curl", "Dumbbells"],
  ["Forearms & Grip", "Farmer's Carry", "Dumbbells"],
  ["Forearms & Grip", "Barbell Wrist Curl", "Barbell"],
  ["Forearms & Grip", "Dead Hang", "Pull-Up Bar"],
  ["Forearms & Grip", "Plate Pinch Hold", "Weight Plates"],
  ["Forearms & Grip", "Towel Hang", "Pull-Up Bar"],
  ["Forearms & Grip", "Wrist Roller", "Wrist Roller"],

  ["Full Body", "Dumbbell Snatch", "Dumbbells"],
  ["Full Body", "Power Clean", "Barbell"],
  ["Full Body", "Hang Clean", "Barbell"],
  ["Full Body", "Clean and Jerk", "Barbell"],
  ["Full Body", "Man Maker", "Dumbbells"],
  ["Full Body", "Bear Crawl", "Bodyweight"],
  ["Full Body", "Inchworm", "Bodyweight"],
  ["Full Body", "Dumbbell Devil Press", "Dumbbells"],
  ["Full Body", "Jump Squat", "Bodyweight"],
  ["Full Body", "Skater Jump", "Bodyweight"],
  ["Full Body", "Medicine Ball Rotational Slam", "Medicine Ball"],
  ["Full Body", "Sled Drag", "Weighted Sled"],
  ["Full Body", "Battle Rope Alternating Waves", "Battle Ropes"],
  ["Full Body", "Kettlebell Goblet Squat", "Kettlebell"],
  ["Full Body", "Kettlebell Turkish Get-Up", "Kettlebell"]
];

function extractArray(source) {
  const start = source.search(/const\s+exercises\s*=\s*\[/);
  if (start < 0) return null;
  const open = source.indexOf("[", start);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = open; i < source.length; i++) {
    const c = source[i];

    if (quote) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === quote) quote = null;
      continue;
    }

    if (c === '"' || c === "'" || c === "`") {
      quote = c;
    } else if (c === "[") {
      depth++;
    } else if (c === "]") {
      depth--;
      if (depth === 0) {
        let end = i + 1;
        if (source[end] === ";") end++;
        return {
          start,
          end,
          text: source.slice(start, end)
        };
      }
    }
  }
  return null;
}

const oldData = extractArray(data);
const oldGym = extractArray(gym);

if (!oldData || !oldGym) {
  console.error("ERROR: Could not safely locate both exercise arrays. No files changed.");
  process.exit(1);
}

const entryRegex = /\{\s*name\s*:\s*"([^"]+)"\s*,\s*muscle\s*:\s*"([^"]+)"\s*,\s*equipment\s*:\s*"([^"]+)"\s*\}/g;
const existing = [...oldData.text.matchAll(entryRegex)];
const seen = new Set(existing.map(m => m[1].toLowerCase()));
const additions = [];

for (const [muscle, name, equipment] of categories) {
  const key = name.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);
  additions.push({ name, muscle, equipment });
}

const all = existing.map(m => ({
  name: m[1],
  muscle: m[2],
  equipment: m[3]
})).concat(additions);

if (all.length < 250) {
  console.error(`ERROR: Only ${all.length} unique exercises would result. No files changed.`);
  process.exit(1);
}

const lines = [
  "const exercises = [",
  ...all.map(e =>
    `  { name: ${JSON.stringify(e.name)}, muscle: ${JSON.stringify(e.muscle)}, equipment: ${JSON.stringify(e.equipment)} },`
  ),
  "];"
];

const replacement = lines.join("\n");
const newData = data.slice(0, oldData.start) + replacement + data.slice(oldData.end);
const newGym = gym.slice(0, oldGym.start) + replacement + gym.slice(oldGym.end);

fs.writeFileSync(dataFile, newData);
fs.writeFileSync(gymFile, newGym);

console.log(`SUCCESS: ${all.length} unique exercises are now integrated.`);
console.log(`Added ${additions.length} new exercises.`);
console.log("Updated exercises.js and Gym.jsx without replacing other Gym features.");
