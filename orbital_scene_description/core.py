from pydantic import BaseModel


class Position(BaseModel):
    """A class representing a position in ECI coordinates."""

    x: float = 0.0
    y: float = 0.0
    z: float = 0.0


class Quaternion(BaseModel):
    """A class representing a quaternion for rotation."""

    w: float = 1.0
    x: float = 0.0
    y: float = 0.0
    z: float = 0.0


class Transform(BaseModel):
    """A class representing a 3D transformation with position and rotation."""

    position: Position = Position()
    quaternion: Quaternion = Quaternion()
