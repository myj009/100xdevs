/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  if (transactions.length == 0) {
    return [];
  }
  let mp = new Map();
  for (const trans of transactions) {
    const { category, price } = trans;
    mp.set(category, (mp.get(category) || 0) + price);
  }
  const ans = [...mp].map(([category, totalSpent]) => ({
    category,
    totalSpent,
  }));

  return ans;
}

module.exports = calculateTotalSpentByCategory;
