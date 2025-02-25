let termData = [
    { id: "1", title: "Test 1", content: "Content Test 1" },
    { id: "2", title: "Aest 2", content: "Content Test 2" },
    { id: "3", title: "Test 3", content: "Content Test 3" },
    { id: "4", title: "Test 4", content: "Content Test 4" },
    { id: "5", title: "Test 5", content: "Content Test 5" },
    { id: "6", title: "Zest 6", content: "Content Test 6" },
    { id: "7", title: "Test 7", content: "Content Test 7" },
    { id: "8", title: "Test 8", content: "Content Test 8" },
    { id: "9", title: "Test 9", content: "Content Test 9" },
    { id: "10", title: "Cest 10", content: "Content Test 10" },
    { id: "11", title: "Best 11", content: "Content Test 11" },
    { id: "12", title: "Test 12", content: "Content Test 12" },
    { id: "13", title: "Test 13", content: "Content Test 13" },
  ];
  termData.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
  export default termData;