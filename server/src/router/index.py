from .files import files_router
from .plot import plot_router
from .training import training_router
from .test_model import test_model_router

# Training


class RouterService:
    def __init__(self):
        self.files_router = files_router
        self.plot_router = plot_router
        self.training_router = training_router
        self.test_model_router = test_model_router

    def register_routes_to_app(self, app):
        app.register_blueprint(self.files_router)
        app.register_blueprint(self.plot_router)
        app.register_blueprint(self.training_router)
        app.register_blueprint(self.test_model_router)
