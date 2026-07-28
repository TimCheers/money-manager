let transactions = [];

function getAll() {
    return transactions;
}

function create({ amount, category }) {
    const transaction = { id: Date.now(), amount, category };
    transactions.push(transaction);
    return transaction;
}

export default { getAll, create };