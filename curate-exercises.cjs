const fs = require("fs");

const groups = {
  "Chest": [
    ["Barbell Bench Press","Barbell"],
    ["Incline Barbell Bench Press","Barbell"],
    ["Decline Barbell Bench Press","Barbell"],
    ["Dumbbell Bench Press","Dumbbells"],
    ["Incline Dumbbell Press","Dumbbells"],
    ["Decline Dumbbell Press","Dumbbells"],
    ["Dumbbell Fly","Dumbbells"],
    ["Incline Dumbbell Fly","Dumbbells"],
    ["Cable Crossover","Cable Machine"],
    ["Low Cable Fly","Cable Machine"],
    ["Pec Deck Fly","Machine"],
    ["Machine Chest Press","Machine"],
    ["Push-Up","Bodyweight"],
    ["Incline Push-Up","Bodyweight"],
    ["Decline Push-Up","Bodyweight"],
    ["Wide-Grip Push-Up","Bodyweight"],
    ["Diamond Push-Up","Bodyweight"],
    ["Chest Dip","Parallel Bars"],
    ["Dumbbell Pullover","Dumbbell"],
    ["Smith Machine Bench Press","Smith Machine"]
  ],
  "Back": [
    ["Pull-Up","Pull-Up Bar"],
    ["Chin-Up","Pull-Up Bar"],
    ["Lat Pulldown","Cable Machine"],
    ["Close-Grip Lat Pulldown","Cable Machine"],
    ["Barbell Bent-Over Row","Barbell"],
    ["Pendlay Row","Barbell"],
    ["Single-Arm Dumbbell Row","Dumbbell"],
    ["Chest-Supported Dumbbell Row","Dumbbells"],
    ["Seated Cable Row","Cable Machine"],
    ["T-Bar Row","T-Bar"],
    ["Machine Row","Machine"],
    ["Straight-Arm Pulldown","Cable Machine"],
    ["Dumbbell Pullover","Dumbbell"],
    ["Deadlift","Barbell"],
    ["Rack Pull","Barbell"],
    ["Back Extension","Back Extension Bench"],
    ["Inverted Row","Smith Machine"],
    ["Face-Down Y Raise","Bodyweight"],
    ["Dumbbell Shrug","Dumbbells"],
    ["Barbell Shrug","Barbell"]
  ],
  "Shoulders": [
    ["Standing Overhead Press","Barbell"],
    ["Seated Dumbbell Shoulder Press","Dumbbells"],
    ["Arnold Press","Dumbbells"],
    ["Machine Shoulder Press","Machine"],
    ["Dumbbell Lateral Raise","Dumbbells"],
    ["Cable Lateral Raise","Cable Machine"],
    ["Machine Lateral Raise","Machine"],
    ["Dumbbell Front Raise","Dumbbells"],
    ["Plate Front Raise","Weight Plate"],
    ["Bent-Over Rear Delt Fly","Dumbbells"],
    ["Reverse Pec Deck","Machine"],
    ["Cable Rear Delt Fly","Cable Machine"],
    ["Face Pull","Cable Machine"],
    ["Barbell Upright Row","Barbell"],
    ["Dumbbell Upright Row","Dumbbells"],
    ["Push Press","Barbell"]
  ],
  "Biceps": [
    ["Barbell Curl","Barbell"],
    ["EZ-Bar Curl","EZ Bar"],
    ["Alternating Dumbbell Curl","Dumbbells"],
    ["Hammer Curl","Dumbbells"],
    ["Incline Dumbbell Curl","Dumbbells"],
    ["Concentration Curl","Dumbbell"],
    ["Preacher Curl","Preacher Bench"],
    ["Cable Biceps Curl","Cable Machine"],
    ["High Cable Curl","Cable Machine"],
    ["Spider Curl","Dumbbells"],
    ["Reverse Curl","EZ Bar"],
    ["Zottman Curl","Dumbbells"]
  ],
  "Triceps": [
    ["Cable Rope Pushdown","Cable Machine"],
    ["Straight-Bar Pushdown","Cable Machine"],
    ["Reverse-Grip Pushdown","Cable Machine"],
    ["Overhead Dumbbell Extension","Dumbbell"],
    ["Seated EZ-Bar Triceps Extension","EZ Bar"],
    ["Skull Crusher","EZ Bar"],
    ["Close-Grip Bench Press","Barbell"],
    ["Triceps Dip","Parallel Bars"],
    ["Bench Dip","Bench"],
    ["Dumbbell Kickback","Dumbbells"],
    ["Single-Arm Cable Extension","Cable Machine"],
    ["Diamond Push-Up","Bodyweight"]
  ],
  "Quadriceps": [
    ["Barbell Back Squat","Barbell"],
    ["Front Squat","Barbell"],
    ["Goblet Squat","Dumbbell"],
    ["Hack Squat","Machine"],
    ["Smith Machine Squat","Smith Machine"],
    ["Leg Press","Leg Press Machine"],
    ["Leg Extension","Machine"],
    ["Bulgarian Split Squat","Dumbbells"],
    ["Walking Lunge","Dumbbells"],
    ["Reverse Lunge","Dumbbells"],
    ["Forward Lunge","Bodyweight"],
    ["Step-Up","Bench"],
    ["Sissy Squat","Bodyweight"],
    ["Wall Sit","Bodyweight"],
    ["Cyclist Squat","Dumbbells"],
    ["Single-Leg Leg Press","Leg Press Machine"],
    ["Heel-Elevated Squat","Weight Plates"],
    ["Dumbbell Split Squat","Dumbbells"]
  ],
  "Hamstrings & Glutes": [
    ["Romanian Deadlift","Barbell"],
    ["Dumbbell Romanian Deadlift","Dumbbells"],
    ["Stiff-Leg Deadlift","Barbell"],
    ["Barbell Hip Thrust","Barbell"],
    ["Glute Bridge","Bodyweight"],
    ["Single-Leg Glute Bridge","Bodyweight"],
    ["Cable Glute Kickback","Cable Machine"],
    ["Seated Leg Curl","Machine"],
    ["Lying Leg Curl","Machine"],
    ["Standing Leg Curl","Machine"],
    ["Nordic Hamstring Curl","Bodyweight"],
    ["Good Morning","Barbell"],
    ["Cable Pull-Through","Cable Machine"],
    ["Kettlebell Swing","Kettlebell"],
    ["Reverse Hyperextension","Machine"],
    ["45-Degree Back Extension","Back Extension Bench"],
    ["Frog Pump","Bodyweight"],
    ["Single-Leg Romanian Deadlift","Dumbbells"]
  ],
  "Calves": [
    ["Standing Calf Raise","Machine"],
    ["Seated Calf Raise","Machine"],
    ["Single-Leg Calf Raise","Bodyweight"],
    ["Leg Press Calf Raise","Leg Press Machine"],
    ["Donkey Calf Raise","Machine"],
    ["Smith Machine Calf Raise","Smith Machine"],
    ["Dumbbell Calf Raise","Dumbbells"],
    ["Calf Raise on Step","Bodyweight"],
    ["Bent-Knee Calf Raise","Dumbbells"],
    ["Tibialis Raise","Bodyweight"]
  ],
  "Abs & Core": [
    ["Plank","Bodyweight"],
    ["Side Plank","Bodyweight"],
    ["Crunch","Bodyweight"],
    ["Reverse Crunch","Bodyweight"],
    ["Bicycle Crunch","Bodyweight"],
    ["Hanging Knee Raise","Pull-Up Bar"],
    ["Hanging Leg Raise","Pull-Up Bar"],
    ["Captain's Chair Knee Raise","Captain's Chair"],
    ["Cable Crunch","Cable Machine"],
    ["Ab Wheel Rollout","Ab Wheel"],
    ["Dead Bug","Bodyweight"],
    ["Bird Dog","Bodyweight"],
    ["Russian Twist","Medicine Ball"],
    ["Mountain Climber","Bodyweight"],
    ["Flutter Kicks","Bodyweight"],
    ["V-Up","Bodyweight"],
    ["Hollow Body Hold","Bodyweight"],
    ["Pallof Press","Cable Machine"],
    ["Cable Wood Chop","Cable Machine"],
    ["Weighted Sit-Up","Weight Plate"]
  ],
  "Forearms & Grip": [
    ["Wrist Curl","Dumbbells"],
    ["Reverse Wrist Curl","Dumbbells"],
    ["Barbell Wrist Curl","Barbell"],
    ["Reverse EZ-Bar Wrist Curl","EZ Bar"],
    ["Farmer's Carry","Dumbbells"],
    ["Dead Hang","Pull-Up Bar"],
    ["Plate Pinch Hold","Weight Plates"],
    ["Wrist Roller","Wrist Roller"],
    ["Barbell Static Hold","Barbell"],
    ["Dumbbell Finger Curl","Dumbbells"],
    ["Wrist Pronation","Dumbbell"],
    ["Wrist Supination","Dumbbell"]
  ],
  "Full Body": [
    ["Burpee","Bodyweight"],
    ["Dumbbell Thruster","Dumbbells"],
    ["Barbell Thruster","Barbell"],
    ["Dumbbell Snatch","Dumbbell"],
    ["Power Clean","Barbell"],
    ["Hang Clean","Barbell"],
    ["Clean and Jerk","Barbell"],
    ["Kettlebell Turkish Get-Up","Kettlebell"],
    ["Man Maker","Dumbbells"],
    ["Dumbbell Devil Press","Dumbbells"],
    ["Bear Crawl","Bodyweight"],
    ["Inchworm","Bodyweight"],
    ["Jump Squat","Bodyweight"],
    ["Skater Jump","Bodyweight"],
    ["Medicine Ball Slam","Medicine Ball"],
    ["Medicine Ball Chest Pass","Medicine Ball"],
    ["Sled Push","Weighted Sled"],
    ["Sled Drag","Weighted Sled"],
    ["Battle Rope Waves","Battle Ropes"],
    ["Kettlebell Goblet Squat","Kettlebell"],
    ["Dumbbell Farmer Walk","Dumbbells"],
    ["Kettlebell High Pull","Kettlebell"]
  ]
};

const entries = [];
for (const [muscle, exercises] of Object.entries(groups)) {
  for (const [name, equipment] of exercises) {
    entries.push({name, muscle, equipment});
  }
}

const names = new Set();
for (const e of entries) {
  const key = e.name.toLowerCase();
  if (names.has(key)) {
    e.name = `${e.name} (${e.muscle})`;
  }
  names.add(e.name.toLowerCase());
}
if (entries.length < 150 || entries.length > 200) {
  throw new Error(`Exercise count ${entries.length} is outside 150–200; no files changed.`);
}

function findArray(source) {
  const start = source.search(/const\s+exercises\s*=\s*\[/);
  if (start < 0) throw new Error("Could not find exercise array.");
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
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        let end = i + 1;
        if (source[end] === ";") end++;
        return {start, end};
      }
    }
  }
  throw new Error("Could not find end of exercise array.");
}

const replacement = [
  "const exercises = [",
  ...entries.map(e =>
    `  { name: ${JSON.stringify(e.name)}, muscle: ${JSON.stringify(e.muscle)}, equipment: ${JSON.stringify(e.equipment)} },`
  ),
  "];"
].join("\n");

const updates = ["exercises.js", "src/pages/Gym.jsx"].map(file => {
  const source = fs.readFileSync(file, "utf8");
  const bounds = findArray(source);
  return {file, updated: source.slice(0, bounds.start) + replacement + source.slice(bounds.end)};
});

for (const item of updates) {
  fs.writeFileSync(item.file, item.updated);
}

console.log(`SUCCESS: Curated ${entries.length} exercises across ${Object.keys(groups).length} body-part categories.`);
for (const [muscle, list] of Object.entries(groups)) {
  console.log(`${muscle}: ${list.length}`);
}
console.log("Updated exercises.js and Gym.jsx. Other Gym page code was preserved.");
