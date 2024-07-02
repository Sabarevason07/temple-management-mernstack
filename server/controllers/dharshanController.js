let dharshanData = [
    { id: 1, name: 'God1', poojaTime: '10:00 AM' },
    { id: 2, name: 'God2', poojaTime: '12:00 PM' },
  ];
  
  exports.getAllDharshan = (req, res) => {
    res.status(200).json(dharshanData);
  };
  
  exports.createDharshan = (req, res) => {
    const newDharshan = req.body;
    dharshanData.push(newDharshan);
    res.status(201).json(newDharshan);
  };