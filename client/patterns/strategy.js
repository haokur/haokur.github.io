/**策略模式 */

const calculateMoneyStrategy = {
  S: (salary) => salary * 6,
  A: (salary) => salary * 4,
  B: (salary) => salary * 2,
  C: (salary) => salary * 1,
};
const employee1Money = 10000 + calculateMoneyStrategy['S'](10000);
const employee2Money = 8000 + calculateMoneyStrategy['C'](8000);

console.log(employee1Money, employee2Money); // 70000 16000
