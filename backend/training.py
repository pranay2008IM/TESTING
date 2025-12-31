import numpy as np 
X=np.array([1,2,3,4,5],dtype=float)
Y=np.array([1,2,3,4,5],dtype=float)

w=0.0
b=0.0
learning_rate=0.01
epochs=1000

def predict(X,w,b):
    return w*X+b

def  compute_loss(Y,Y_PRED):
    return np.mean((Y-Y_PRED)**2)

def compute_stoch(x_i,y_i,w,b):
    y_pred_i=w*x_i+b
    error=y_i-y_pred_i
    dw=-2*x_i*error
    db=-2*error
    return dw,db


def compute_gradients(X,Y,Y_PRED):#for averave here
    m=len(X)
    dw=(-2/m)*np.sum(X*(Y-Y_PRED))
    db=(-2/m)*np.sum(Y-Y_PRED)
    return dw,db

for epoch in range(epochs):
    for x_i,y_i in zip(X,Y):
        dw,db=compute_stoch(x_i,y_i,w,b)
        w=w-learning_rate*dw
        b=b-learning_rate*db
    Y_PRED = predict(X, w, b)
    loss = compute_loss(Y, Y_PRED)
    if epoch:

        print(f"Epoch {epoch}, Loss = {loss:.6f}, w = {w:.6f}, b = {b:.6f}")
print("\n Training finished")
print(f"final parameters:w={w:6f},b={b:6f}")
print("predictions on x:",predict(X,w,b))#IT IS ACTUALLY GIVING THE OUTPUT FO THE FUNTION PREDICT IN THE ARRAY OR TEH VECOTR FORM NOW 
