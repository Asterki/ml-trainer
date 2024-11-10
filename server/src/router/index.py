from .files import files_router


class RouterService:
    def __init__(self):
        self.files_router = files_router

    def get_router(self):
        return self.files_router

    def register_routes_to_app(self, app):
        app.register_blueprint(self.files_router)
