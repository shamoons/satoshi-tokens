const BalanceDisplay = ({ balance }: { balance: number }) => {
  return <p className="mb-4">Your Balance: {balance} satoshis</p>;
};

export default BalanceDisplay;