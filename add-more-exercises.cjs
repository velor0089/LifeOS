const fs = require("fs");

const files = ["exercises.js", "src/pages/Gym.jsx"];

const additions = [
["Chest","Dumbbell Squeeze Press","Dumbbells"],
["Chest","Alternating Dumbbell Press","Dumbbells"],
["Chest","Single-Arm Machine Fly","Machine"],
["Chest","Standing Cable Press","Cable Machine"],
["Chest","Resistance Band Incline Press","Resistance Band"],
["Chest","Feet-Elevated Push-Up","Bodyweight"],
["Chest","Tempo Push-Up","Bodyweight"],
["Chest","Wide-Grip Machine Press","Machine"],
["Chest","Neutral-Grip Dumbbell Press","Dumbbells"],
["Chest","Landmine Chest Press","Landmine"],

["Back","Wide-Grip Seated Cable Row","Cable Machine"],
["Back","Close-Grip Seated Cable Row","Cable Machine"],
["Back","Single-Arm Dumbbell Row","Dumbbells"],
["Back","Incline Bench Dumbbell Row","Dumbbells"],
["Back","Barbell Rack Pull","Barbell"],
["Back","Snatch-Grip Deadlift","Barbell"],
["Back","Machine Pullover","Machine"],
["Back","Kneeling Lat Pulldown","Cable Machine"],
["Back","Resistance Band Lat Pulldown","Resistance Band"],
["Back","Prone Y Raise","Bodyweight"],

["Shoulders","Dumbbell Z Press","Dumbbells"],
["Shoulders","Single-Arm Landmine Press","Landmine"],
["Shoulders","Cable Upright Row","Cable Machine"],
["Shoulders","Dumbbell Upright Row","Dumbbells"],
["Shoulders","Bent-Over Dumbbell Reverse Fly","Dumbbells"],
["Shoulders","Incline Bench Rear Delt Raise","Dumbbells"],
["Shoulders","Machine Lateral Raise","Machine"],
["Shoulders","Seated Barbell Overhead Press","Barbell"],
["Shoulders","Standing Barbell Overhead Press","Barbell"],
["Shoulders","Wall Slide","Bodyweight"],

["Biceps","Seated Alternating Curl","Dumbbells"],
["Biceps","Standing EZ-Bar Curl","EZ Bar"],
["Biceps","Cable Rope Hammer Curl","Cable Machine"],
["Biceps","High Cable Curl","Cable Machine"],
["Biceps","Single-Arm Preacher Curl","Dumbbells"],
["Biceps","Drag Curl","Barbell"],
["Biceps","Zottman Curl","Dumbbells"],
["Biceps","Resistance Band Hammer Curl","Resistance Band"],
["Biceps","Machine Biceps Curl","Machine"],
["Biceps","Isometric Dumbbell Curl Hold","Dumbbells"],

["Triceps","Rope Triceps Pushdown","Cable Machine"],
["Triceps","V-Bar Triceps Pushdown","Cable Machine"],
["Triceps","Reverse-Grip Pushdown","Cable Machine"],
["Triceps","Seated Overhead Dumbbell Extension","Dumbbells"],
["Triceps","Single-Arm Overhead Dumbbell Extension","Dumbbells"],
["Triceps","Close-Grip Floor Press","Barbell"],
["Triceps","Dumbbell Rolling Triceps Extension","Dumbbells"],
["Triceps","Incline Dumbbell Triceps Extension","Dumbbells"],
["Triceps","Diamond Knee Push-Up","Bodyweight"],
["Triceps","Band Overhead Triceps Extension","Resistance Band"],

["Quadriceps","Dumbbell Front Squat","Dumbbells"],
["Quadriceps","Barbell Split Squat","Barbell"],
["Quadriceps","Deficit Reverse Lunge","Dumbbells"],
["Quadriceps","Lateral Step-Up","Bench"],
["Quadriceps","Wall Sit","Bodyweight"],
["Quadriceps","Single-Leg Leg Press","Leg Press"],
["Quadriceps","Narrow-Stance Leg Press","Leg Press"],
["Quadriceps","Cyclist Squat","Dumbbells"],
["Quadriceps","TRX Assisted Squat","Suspension Trainer"],
["Quadriceps","Walking Bodyweight Lunge","Bodyweight"],

["Hamstrings & Glutes","Dumbbell Romanian Deadlift","Dumbbells"],
["Hamstrings & Glutes","Single-Leg Hip Thrust","Bodyweight"],
["Hamstrings & Glutes","Cable Glute Kickback","Cable Machine"],
["Hamstrings & Glutes","Machine Hip Thrust","Machine"],
["Hamstrings & Glutes","Banded Glute Bridge","Resistance Band"],
["Hamstrings & Glutes","Stability Ball Leg Curl","Stability Ball"],
["Hamstrings & Glutes","Slider Hamstring Curl","Sliders"],
["Hamstrings & Glutes","Kettlebell Romanian Deadlift","Kettlebell"],
["Hamstrings & Glutes","Dumbbell Good Morning","Dumbbells"],
["Hamstrings & Glutes","Reverse Hyperextension","Machine"],

["Calves","Seated Single-Leg Calf Raise","Dumbbells"],
["Calves","Bodyweight Calf Raise","Bodyweight"],
["Calves","Donkey Calf Raise","Bodyweight"],
["Calves","Single-Leg Leg Press Calf Raise","Leg Press"],
["Calves","Bent-Knee Calf Raise","Dumbbells"],
["Calves","Calf Raise on Step","Bodyweight"],
["Calves","Tibialis Raise Against Wall","Bodyweight"],
["Calves","Resistance Band Plantar Flexion","Resistance Band"],

["Abs & Core","Bird Dog","Bodyweight"],
["Abs & Core","Flutter Kicks","Bodyweight"],
["Abs & Core","Scissor Kicks","Bodyweight"],
["Abs & Core","V-Up","Bodyweight"],
["Abs & Core","Toe Touch Crunch","Bodyweight"],
["Abs & Core","Weighted Plank","Weight Plate"],
["Abs & Core","Cable Wood Chop","Cable Machine"],
["Abs & Core","Landmine Rotation","Landmine"],
["Abs & Core","Stability Ball Crunch","Stability Ball"],
["Abs & Core","Suitcase Carry","Dumbbell"],

["Forearms & Grip","Dumbbell Finger Curl","Dumbbells"],
["Forearms & Grip","Reverse EZ-Bar Wrist Curl","EZ Bar"],
["Forearms & Grip","Barbell Static Hold","Barbell"],
["Forearms & Grip","Heavy Dumbbell Hold","Dumbbells"],
["Forearms & Grip","Rope Cable Wrist Curl","Cable Machine"],
["Forearms & Grip","Rubber Band Finger Extension","Resistance Band"],
["Forearms & Grip","Towel Dumbbell Hold","Dumbbells"],
["Forearms & Grip","Wrist Pronation","Dumbbells"],

["Full Body","Kettlebell High Pull","Kettlebell"],
["Full Body","Dumbbell Hang Clean","Dumbbells"],
["Full Body","Alternating Dumbbell Thruster","Dumbbells"],
["Full Body","Burpee to Push-Up","Bodyweight"],
["Full Body","Squat Thrust","Bodyweight"],
["Full Body","Bear Plank Shoulder Tap","Bodyweight"],
["Full Body","Medicine Ball Chest Pass","Medicine Ball"],
["Full Body","Kettlebell Deadlift","Kettlebell"],
["Full Body","Dumbbell Farmer Walk","Dumbbells"],
["Full Body","Sled Push Sprint","Weighted Sled"]
];

function getArray(source) {
  const start = source.search(/const\s+exercises\s*=\s*\[/);
  if (start < 0) throw new Error("Exercise array not found");
  const open = source.indexOf("[", start);
  let depth = 0, quote = null, escaped = false;

  for (let i = open; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "[") depth++;
    else if (c === "]" && --depth === 0) {
      let end = i + 1;
      if (source[end] === ";") end++;
      return {start, end, text: source.slice(start, end)};
    }
  }
  throw new Error("Exercise array was not closed correctly");
}

const entryPattern = /\{\s*name\s*:\s*"([^"]+)"\s*,\s*muscle\s*:\s*"([^"]+)"\s*,\s*equipment\s*:\s*"([^"]+)"\s*\}/g;

const originals = files.map(file => {
  const source = fs.readFileSync(file, "utf8");
  return {file, source, array: getArray(source)};
});

const firstEntries = [...originals[0].array.text.matchAll(entryPattern)];
if (firstEntries.length < 50) {
  throw new Error("Too few existing exercises found. Nothing changed.");
}

const exercises = firstEntries.map(m => ({
  name: m[1], muscle: m[2], equipment: m[3]
}));

const seen = new Set(exercises.map(e => e.name.toLowerCase()));
let added = 0;

for (const [muscle, name, equipment] of additions) {
  if (seen.has(name.toLowerCase())) continue;
  seen.add(name.toLowerCase());
  exercises.push({muscle, name, equipment});
  added++;
}

if (exercises.length < 250) {
  throw new Error(`Only ${exercises.length} exercises found. Nothing changed.`);
}

const newArray = [
  "const exercises = [",
  ...exercises.map(e =>
    `  { name: ${JSON.stringify(e.name)}, muscle: ${JSON.stringify(e.muscle)}, equipment: ${JSON.stringify(e.equipment)} },`
  ),
  "];"
].join("\n");

for (const item of originals) {
  const updated = item.source.slice(0, item.array.start) +
    newArray + item.source.slice(item.array.end);
  fs.writeFileSync(item.file, updated);
}

console.log(`SUCCESS: ${exercises.length} exercises integrated.`);
console.log(`Added ${added} unique exercises.`);
