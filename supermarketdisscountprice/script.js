function PricingRule(itemType, count, price) {
  this.ItemType = itemType;
  this.Count = count;
  this.Price = price;

  this.CalculateTotal = function (itemCount) {
    const BatchCount = Math.floor(itemCount / this.Count);
    return {
      Price: this.Price * BatchCount,
      Remainder: itemCount - BatchCount * this.Count,
    };
  };
}

const ALL_RULES = [
  new PricingRule("A", 1, 50),
  new PricingRule("A", 3, 130),
  new PricingRule("B", 1, 30),
  new PricingRule("B", 2, 45),
  new PricingRule("C", 1, 20),
  new PricingRule("D", 1, 15),
];

function PriceCalculator(rules) {
  this.Rules = rules;
  this.Items = [];

  this.Scan = function (itemType) {
    const item = this.Items.find((e) => e.Type == itemType);
    if (item) {
      item.Count++;
    } else {
      this.Items.push({ Type: itemType, Count: 1 });
    }
  };
  this.CalculateTotal = function () {
    let total = 0;
    this.Items.forEach((item) => {
      let remainder = item.Count;

      let itemRules = this.Rules.filter((e) => e.ItemType == item.Type).sort(
        (a, b) => (a.Count < b.Count ? 1 : -1)
      );

      itemRules.forEach((rule) => {
        console.log(rule);
        let result = rule.CalculateTotal(remainder);
        total += result.Price;
        remainder = result.Remainder;
      });
    });
    return total;
  };
}

function calculateTotalPrice() {
  let input = document.querySelector("#uxInput").value ?? "";
  let calculator = new PriceCalculator(ALL_RULES);
  console.log(input, input.split(""));
  input.split("").forEach((itemType) => calculator.Scan(itemType));
  console.log(calculator.Items);
  console.log(calculator.Rules);
  document.querySelector(
    "#container"
  ).innerHTML = `<h1>Price for ${input} is </h1> <h1> ${calculator.CalculateTotal()}<h1>`;
  // alert("Price For (" + input + ") : " + calculator.CalculateTotal());
}
