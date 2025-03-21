let categoryDataList = [
  { id: "1", title: "Vaccinations", content: "Ensure your baby receives all required vaccinations at the recommended ages. These include DTP, polio, and MMR vaccines." },
  { id: "2", title: "Breastfeeding", content: "Breastfeeding provides essential nutrients for your baby in the early months. It strengthens the immune system and supports bonding." },
  { id: "3", title: "Sleep Routines", content: "Establishing a consistent sleep routine for your baby can help promote better sleep. Try a regular bedtime and a soothing environment." },
  { id: "4", title: "Tummy Time", content: "Tummy time is important for your baby’s development. It helps strengthen muscles and prepares them for crawling." },
  { id: "5", title: "Diapering", content: "Keep your baby’s diaper area clean and dry to prevent rashes. Change diapers regularly and use gentle wipes." },
  { id: "6", title: "Baby Proofing", content: "Ensure your home is baby-proofed by securing sharp objects, covering electrical outlets, and keeping choking hazards out of reach." },
  { id: "7", title: "Teething", content: "When babies start teething, they may be irritable. Offer teething rings or cool washcloths to soothe their gums." },
  { id: "8", title: "Developmental Milestones", content: "Monitor your baby’s milestones such as rolling over, sitting up, and walking. Always consult a pediatrician if you have concerns." },
  { id: "9", title: "Baby Skin Care", content: "Use mild, hypoallergenic products for your baby’s sensitive skin. Bathing your baby with lukewarm water and moisturizing afterward helps prevent dryness." },
  { id: "10", title: "SIDS Prevention", content: "To reduce the risk of Sudden Infant Death Syndrome (SIDS), always place your baby on their back to sleep in a safe crib." },
  { id: "11", title: "Growth Charts", content: "Regularly track your baby’s growth using pediatric growth charts. Ensure they are growing at a healthy rate according to their age." },
  { id: "12", title: "Health Checkups", content: "Regular pediatrician visits are vital to monitor your baby’s health, growth, and vaccination schedule." },
  { id: "13", title: "Parenting Support", content: "Parenting can be challenging. Seek support from family, friends, or parenting groups to ease your journey." },
];
  categoryDataList.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
  export const categoryData = categoryDataList;

  let prematureCategoryDataList = [
    { id: "1", title: "Feeding Premature Babies", content: "Premature babies may need special feeding schedules. Breast milk or preemie formula is often recommended to ensure they receive adequate nutrition." },
    { id: "2", title: "Respiratory Support", content: "Premature babies may have underdeveloped lungs and require respiratory support, such as a CPAP machine, to help them breathe." },
    { id: "3", title: "Bonding and Touch", content: "Skin-to-skin contact (kangaroo care) is important for premature babies as it helps regulate their temperature and promotes emotional bonding." },
    { id: "4", title: "Growth and Development Monitoring", content: "Premature babies should be closely monitored for developmental milestones. Pediatricians will track growth and motor skills to ensure proper development." },
    { id: "5", title: "Infection Prevention", content: "Premature babies are more susceptible to infections. Always wash hands before touching your baby, and keep their environment clean." },
    { id: "6", title: "Temperature Regulation", content: "Premature babies have difficulty maintaining body heat. Ensure they are kept warm using blankets, special clothing, and a regulated room temperature." },
    { id: "7", title: "Vaccination Schedule", content: "Premature babies often require adjusted vaccination schedules. Consult with your pediatrician for a plan tailored to your baby’s needs." },
    { id: "8", title: "Regular Checkups", content: "Frequent pediatric visits are essential to monitor your premature baby’s health, including growth, respiratory function, and development." },
    { id: "9", title: "Feeding Tube Care", content: "If your premature baby requires a feeding tube, follow proper hygiene protocols to prevent infections and ensure the tube stays clear." },
    { id: "10", title: "Neurological Development", content: "Premature babies may have an increased risk of neurological delays. Early intervention therapies can help with motor and cognitive development." },
    { id: "11", title: "Vision and Hearing Tests", content: "Premature babies should have regular vision and hearing screenings to detect any potential issues early on." },
    { id: "12", title: "Family Support", content: "Caring for a premature baby can be overwhelming. Join support groups or seek counseling to help manage stress and emotions during this challenging time." },
    { id: "13", title: "Discharge Planning", content: "Premature babies may have longer hospital stays. Work closely with your medical team to prepare for your baby’s safe discharge and at-home care." },
  ];
  prematureCategoryDataList.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
  export const prematureCategoryData = prematureCategoryDataList;