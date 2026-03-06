namespace sales.order;

entity Orders {
  key ID        : UUID;
  customerID    : String;
  amount        : Decimal(15,2);
  status        : String default 'Available';
  createdAt     : Timestamp;
}
