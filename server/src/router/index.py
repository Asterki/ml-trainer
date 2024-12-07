from .files import files_router
from .plot import plot_router
from .training import training_router

# Training


class RouterService:
    def __init__(self):
        self.files_router = files_router
        self.plot_router = plot_router
        self.training_router = training_router

    def register_routes_to_app(self, app):
        app.register_blueprint(self.files_router)
        app.register_blueprint(self.plot_router)
        app.register_blueprint(self.training_router)
