from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
import joblib

X, y = make_classification(n_features=4, n_informative=2, n_redundant=0, random_state=42)
model = RandomForestClassifier(random_state=42)

model.fit(X,y)

joblib.dump(model, "trained_model.joblib")

print("model is saved as 'trained_model.joblib'")