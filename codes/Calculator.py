import streamlit as st

class Calculator:
    def addition(self, number1, number2):
        return number1 + number2

    def subtraction(self, number1, number2):
        return number1 - number2

    def division(self, number1, number2):
        return number1 / number2

    def multiplication(self, number1, number2):
        return number1 * number2

    def isdivisible(self, number1, number2):
        return "Yes, divisible" if number1 % number2 == 0 else "No, not divisible"


st.title("Simple Calculator")

num1 = st.number_input("Enter first number")
num2 = st.number_input("Enter second number")

operation = st.selectbox("Select operation", ["Addition", "Subtraction", "Multiplication", "Division", "Is Divisible?"])

abc = Calculator()

try:
    if st.button("Calculate"):
        if operation == "Addition":
            st.write("Result:", abc.addition(num1, num2))
        elif operation == "Subtraction":
            st.write("Result:", abc.subtraction(num1, num2))
        elif operation == "Multiplication":
            st.write("Result:", abc.multiplication(num1, num2))
        elif operation == "Division":
            st.write("Result:", abc.division(num1, num2))
        elif operation == "Is Divisible?":
            st.write("Result:", abc.isdivisible(num1, num2))
except ZeroDivisionError:
    st.error("Division by zero is not allowed.")
except:
    st.error("Please enter valid values")
