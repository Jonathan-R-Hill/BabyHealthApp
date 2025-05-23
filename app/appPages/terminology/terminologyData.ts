let termData = [
  {
    id: "1",
    title: "Acidosis",
    content: "An abnormally high level of acid in the blood",
  },
  { id: "2", title: "Aorta", content: "The main artery leaving the heart" },
  { id: "3", title: "Anaemia", content: "Not enough red blood cells" },
  {
    id: "4",
    title: "Apgar score",
    content:
      "A simple way of assessing the baby’s health immediately after birth, by scoring ‘points’ for heart rate, breathing, skin colour, tone, and the baby’s reactions",
  },
  {
    id: "5",
    title: "Apnoea",
    content:
      "A pause in breathing. 'Apnoeic attacks' are short spurts in which breathing is interrupted. These episodes usually repeat themselves.",
  },
  {
    id: "6",
    title: "Bagging",
    content:
      "Putting a mask connected to a squeezable bag over the baby’s nose and mouth to help breathing.",
  },
  {
    id: "7",
    title: "Bilirubin",
    content:
      "Yellow pigment in blood, which gives a yellow colouring to the skin.",
  },
  {
    id: "8",
    title: "Blood gases",
    content:
      "Laboratory test to find out levels of oxygen and carbon dioxide gases in the blood. The purpose is to work out how well the lungs and circulation are functioning.",
  },
  {
    id: "9",
    title: "Bradycardia",
    content: "When the heart rate temporarily slows down.",
  },
  {
    id: "10",
    title: "Breast pump",
    content:
      "A piece of equipment, which is either manual or electric, used for expressing breast milk.",
  },
  {
    id: "11",
    title: "Blood pressure",
    content: "The pressure of blood against the artery walls.",
  },
  {
    id: "12",
    title: "Blood Sugar",
    content: "The concentration of glucose in the blood.",
  },
  {
    id: "13",
    title: "Blood transfusion",
    content: "Blood from the blood transfusion services.",
  },
  {
    id: "14",
    title: "Bronchiolitis",
    content:
      "Inflammation of the small airways in the lungs due to viral infection.",
  },
  {
    id: "15",
    title: "Broncho Pulmonary Dysplasia (BPD)",
    content:
      "A disorder of the lung, which may have come about because the baby has been on a ventilator for a long time. When this happens, the baby needs more oxygen and may have difficulty breathing, which can take some time to improve.",
  },
  {
    id: "16",
    title: "Centile charts",
    content:
      "Graphs showing the normal ranges of body measurements at different ages.",
  },
  {
    id: "17",
    title: "Cerebrospinal fluid (CSF)",
    content:
      "Fluid produced within the brain, which flows into the fluid in the area of the spinal cord. If the flow is obstructed, or the brain is not absorbing enough, it can lead to hydrocephalus, ‘water on the brain’.",
  },
  {
    id: "18",
    title: "Chronic lung disease (CLD)",
    content:
      "Lung disorder leading to breathing difficulties, also known as Bronchopulmonary Dysplasia (BPD).",
  },
  {
    id: "19",
    title: "Chest Drain",
    content:
      "Tube passed through the chest wall to drain off air leaking from the lung.",
  },
  {
    id: "20",
    title: "Chronological age",
    content: "A baby’s age from the actual date of birth.",
  },
  {
    id: "21",
    title: "Cooling",
    content:
      "In babies who have suffered significantly reduced oxygen supply to the brain around the time of delivery, maintaining whole-body temperature from 33.5C to 34.5C may be beneficial. This is called 'total body cooling' and is available in specialized units.",
  },
  {
    id: "22",
    title: "Corrected age",
    content:
      "The age of a premature baby if he/she had been born on their due date.",
  },
  {
    id: "23",
    title: "Continuous positive airway pressure (CPAP)",
    content:
      "A method of helping a baby’s breathing by maintaining a slightly higher level of pressure to keep air in the under-developed lungs.",
  },
  {
    id: "24",
    title: "Cyanosis",
    content:
      "Lack of oxygen in the blood, which makes the skin, lips, and nails appear bluish.",
  },
  {
    id: "25",
    title: "Drip",
    content:
      "When fluids or blood are passed into a vein or artery, using a needle or plastic tube.",
  },
  {
    id: "26",
    title: "ECG (Electrocardiogram)",
    content: "Graph showing the heart’s electrical activity.",
  },
  {
    id: "27",
    title: "EEG (Electroencephalogram)",
    content: "Graph showing the brain’s electrical activity.",
  },
  {
    id: "28",
    title: "Electrolytes",
    content:
      "Essential substances in the body which, when dissolved, allow electric current to flow (e.g., sodium chloride, potassium chloride).",
  },
  {
    id: "29",
    title: "Endotracheal tube",
    content:
      "Soft plastic tube inserted through the mouth or nose to the windpipe (trachea) to help breathing.",
  },
  {
    id: "30",
    title: "Exchange transfusion",
    content: "Replacing the baby’s blood with blood from an adult donor.",
  },
  {
    id: "31",
    title: "Expressing breast milk",
    content: "Manipulating the breast to produce milk.",
  },
  {
    id: "32",
    title: "Extubate",
    content: "Removing the endotracheal tube from the windpipe.",
  },
  { id: "33", title: "Fever", content: "A rise in body temperature." },
  {
    id: "34",
    title: "Full-term",
    content:
      "A baby born any time between the 37th and 42nd week of pregnancy.",
  },
  {
    id: "35",
    title: "Fontanelle",
    content:
      "Soft spots on a baby’s head, which disappear as the bones grow together.",
  },
  {
    id: "36",
    title: "Gestational age",
    content: "The time in weeks from the start of the last menstrual period.",
  },
  {
    id: "37",
    title: "Grunting",
    content: "Noise made by a baby with breathing difficulty.",
  },
  {
    id: "38",
    title: "Haemoglobin",
    content: "The part of the red blood cells that carries oxygen.",
  },
  {
    id: "39",
    title: "Head circumference",
    content: "Measurement of the maximum distance around the baby’s head.",
  },
  {
    id: "40",
    title: "Hypocalcaemia",
    content: "A lower than normal level of blood calcium.",
  },
  {
    id: "41",
    title: "Hypoglycaemia",
    content: "Abnormally low blood glucose level.",
  },
  {
    id: "42",
    title: "Hypothermia",
    content: "When the body temperature drops below 35.5C (95F).",
  },
  {
    id: "43",
    title: "Hypoxia",
    content: "Abnormally low amount of oxygen in the blood tissues.",
  },
  {
    id: "44",
    title: "Jaundice",
    content:
      "Yellowness of the skin/white of the eyes caused by a higher level of bilirubin in the blood.",
  },
  {
    id: "45",
    title: "Kangaroo care",
    content:
      "A technique of placing babies on their parent’s chest to encourage skin-to-skin contact.",
  },
  { id: "46", title: "Low Birth Weight (LBW)", content: "Less than 2.5 kg." },
  {
    id: "47",
    title: "Meconium",
    content:
      "Dark greenish material that builds up in the digestive system before birth, and is usually passed as bowel movements within 24 hours of birth.",
  },
  {
    id: "48",
    title: "Milestone",
    content:
      "Important points in a baby’s development, such as crawling, walking and talking.",
  },
  {
    id: "49",
    title: "Meconium aspiration",
    content:
      "A baby who becomes distressed before delivery may pass meconium (described above) while he or she is still in the womb. If the baby then inhales the fluid in which he or she is 'floating' in the womb, the sticky material irritates and partially blocks the airways, causing breathing difficulties around the time the baby is born.",
  },
  {
    id: "50",
    title: "Monitors",
    content:
      "Crucial equipment to keep track of the vital signs (heart rate, respiratory rate, temperature, oxygen situation, blood pressure and so on). They usually alert us to changes in the baby’s condition needing intervention.",
  },
  {
    id: "51",
    title: "Naso Gastric Feeds (NG Feeds)",
    content:
      "Feeding using a fine, soft tube passed through the nose into the stomach.",
  },
  {
    id: "52",
    title: "Neonatal Unit (NNU)",
    content: "A hospital unit devoted to providing care for new-born babies.",
  },
  {
    id: "53",
    title: "Neonatal Intensive Care Unit (NICU)",
    content:
      "A unit, usually in a large regional hospital, that can provide intensive care for new-born babies.",
  },
  {
    id: "54",
    title: "Neonate",
    content: "Baby during the first four weeks of life.",
  },
  {
    id: "55",
    title: "Necrotising Enterocolitis (NEC)",
    content:
      "When a section of the wall of the intestine is swollen or inflamed because of damage to the lining. This is often linked to a period in which the blood flow has been obstructed. The abdomen may swell up, and blood is passed through the bowels. Air penetrates the wall of the digestive tract; and sometimes, though very rarely, it may make a hole in the gut.",
  },
  {
    id: "56",
    title: "Nitric Oxide Therapy",
    content:
      "Babies who need high oxygen requirement and support to breathe due to reduced blood supply to the lungs may benefit from Nitric Oxide when added on to the respiratory support.",
  },
  {
    id: "57",
    title: "Oedema",
    content: "Swelling caused by too much fluid in the tissues under the skin.",
  },
  {
    id: "58",
    title: "Patent Ductus Arteriosus (PDA)",
    content:
      "An opening in the blood vessel connecting the pulmonary artery to the aorta that should close soon after birth.",
  },
  {
    id: "59",
    title: "Periventricular haemorrhage",
    content:
      "Haemorrhages (bleeding) occurring within the fluid-filled brain compartments known as the ventricles.",
  },
  {
    id: "60",
    title: "Premature",
    content: "A baby born before the 37th completed week of pregnancy.",
  },
  {
    id: "61",
    title: "PEEP (Positive End Expiratory Pressure)",
    content:
      "Pressure applied during breathing out, which helps keep the lungs from collapsing while the baby is on the ventilator.",
  },
  {
    id: "62",
    title: "Persistent Foetal Circulation",
    content:
      "Before birth, the blood vessels of the lung are narrow. If the blood vessels do not relax after birth, blood flow to the lungs is reduced. Oxygen, and sometimes drugs, is given to help with this.",
  },
  {
    id: "63",
    title: "PH",
    content:
      "Is about the acidity (low value) or alkalinity (raised value) of the blood. A value close to 7.4 is normal for arterial blood.",
  },
  {
    id: "64",
    title: "Phototherapy",
    content: "Using light to reduce the bilirubin level (jaundice).",
  },
  {
    id: "65",
    title: "Physiotherapy",
    content: "Special exercises to improve or relieve physical problems.",
  },
  {
    id: "66",
    title: "Pneumothorax",
    content:
      "When there is air between the lung and chest wall if a lung has leaked air.",
  },
  {
    id: "67",
    title: "Posset",
    content: "When the baby spits up a small amount of milk after feeding.",
  },
  {
    id: "68",
    title: "Red blood cells",
    content: "A cell in the blood that carries oxygen.",
  },
  {
    id: "69",
    title: "Respiratory Distress Syndrome (RDS)",
    content:
      "Breathing difficulty caused by immature lungs and lack of surfactant.",
  },
  {
    id: "70",
    title: "Respiratory Syncytial Virus (RSV)",
    content:
      "An infection of the respiratory tract that causes colds in children and adults but can be very serious in babies.",
  },
  {
    id: "71",
    title: "Retinopathy of prematurity (ROP)",
    content:
      "Damage to the retina area of the eye that is sensitive to light; usually linked to the amount of oxygen in the blood reaching the retina.",
  },
  {
    id: "72",
    title: "Suction machine",
    content: "Machine used to clear the airway of secretions.",
  },
  {
    id: "73",
    title: "Surfactant",
    content:
      "A substance lining the airways of the lungs that reduces surface tension and prevents the lungs from collapsing.",
  },
  {
    id: "74",
    title: "SGA (Small for gestational age)",
    content:
      "Baby whose birth weight is lower than that of 97% of babies of the same gestational age.",
  },
  { id: "75", title: "Tachycardia", content: "Rapid heartbeat." },
  { id: "76", title: "Tachypnoea", content: "Rapid breathing rate." },
  {
    id: "77",
    title: "TPN",
    content:
      "A way of supplying all the most vital nutrients directly into the blood by either a type of drip (called a peripheral drip) or a central line.",
  },
];

termData.sort((a, b) =>
  a.title.toLowerCase().localeCompare(b.title.toLowerCase())
);
export default termData;
