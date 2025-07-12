from datetime import datetime

from pydantic import BaseModel

from orbital_scene_description.core import Position, Transform


class Spacecraft(BaseModel):
    """A class representing a spacecraft with a name and transformation."""

    transform: Transform = Transform()


class Scene(BaseModel):
    """A class representing the scene with an epoch, sun position, and spacecrafts."""

    epoch: datetime
    sun: Position = Position()
    spacecrafts: dict[str, Spacecraft] = {}
