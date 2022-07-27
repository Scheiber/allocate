import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/transactions`)
      .then((res) => setTransactions(res.data))
      .catch((error) => console.log(error));
  }, []);

  const transactionsList = transactions.map((transaction, index) => {
    return (
      <li className="transaction" key={index}>
        <p>
          <strong>{transaction.date}</strong>
        </p>
        <Link to={`/transactions/${index}`}>
          <p>{transaction.item_name}</p>
        </Link>
        <p>{formatter.format(transaction.amount)}</p>
      </li>
    );
  });

  const getTotal = () => {
    let sum = 0;
    for (let transaction of transactions) {
      sum += Number(transaction.amount);
    }
    return sum;
  };

  const bankAccountSum = getTotal();

  const balanceColor = (bankAccountSum) => {
    return bankAccountSum >= 1000
      ? "aboveOneThousandBalance"
      : bankAccountSum >= 0
      ? "positiveBalance"
      : "negativeBalance";
  };

  return (
    <div>
      <h2>
        Current Balance:{" "}
        <span className={balanceColor(bankAccountSum)}>
          {formatter.format(bankAccountSum)}
        </span>
      </h2>
      <ul>{transactionsList}</ul>
    </div>
  );
};

export default Transactions;
