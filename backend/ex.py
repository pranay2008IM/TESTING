import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 100)
z = 2*x + 1

def sigmoid(z):
    return 1/(1+np.exp(-z))

def relu(z):
    return np.maximum(0, z)

plt.plot(x, z, label='Linear')
plt.plot(x, sigmoid(z), label='Sigmoid')
plt.plot(x, relu(z), label='ReLU')
plt.legend()
plt.show()
