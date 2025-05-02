import streamlit as st

class Calculator:
    def addition(self, number1, number2):
        return number1 + number2

    def subtraction(self, number1, number2):
        return number1 - number2

    def division(self, number1, number2):
        if number2 == 0:
            return "Error: Division by zero"
        return number1 / number2

    def multiplication(self, number1, number2):
        return number1 * number2

    def isdivisible(self, number1, number2):
        if number2 == 0:
            return "Cannot divide by zero"
        return "Yes, divisible" if number1 % number2 == 0 else "No, not divisible"

# Streamlit UI
st.title("Simple Calculator")

# Input numbers
num1 = st.number_input("Enter first number")
num2 = st.number_input("Enter second number")

# Choose operation
operation = st.selectbox("Select operation", ["Addition", "Subtraction", "Multiplication", "Division", "Is Divisible?"])

calc = Calculator()

if st.button("Calculate"):
    if operation == "Addition":
        st.write("Result:", calc.addition(num1, num2))
    elif operation == "Subtraction":
        st.write("Result:", calc.subtraction(num1, num2))
    elif operation == "Multiplication":
        st.write("Result:", calc.multiplication(num1, num2))
    elif operation == "Division":
        st.write("Result:", calc.division(num1, num2))
    elif operation == "Is Divisible?":
        st.write("Result:", calc.isdivisible(num1, num2))
