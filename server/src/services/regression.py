import pandas as pd
from sklearn.linear_model import LinearRegression


def train_linear_regression_model(data: pd.DataFrame, target: str, features: list[str]):
    X = data[features]
    y = data[target]

    model = LinearRegression()
    model.fit(X, y)

    return model
