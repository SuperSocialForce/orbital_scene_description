from pydantic import BaseModel, field_validator

from orbital_scene_description.core import Transform


class Frame(BaseModel):
    """A class representing a frame with a name and transformation."""

    transform: Transform = Transform()
    parent: str | None = None
    description: str | None = None


class Spacecraft(BaseModel):
    frames: dict[str, Frame] = {}

    @field_validator("frames", mode="after")
    @classmethod
    def validate_frames(cls, frames: dict[str, Frame]) -> dict[str, Frame]:
        for value in frames.values():
            if value.parent is None:
                value.parent = "world"
            else:
                if value.parent not in frames:
                    raise ValueError(
                        f"Parent frame '{value.parent}' not found in frames."
                    )
        return frames


if __name__ == "__main__":
    # Example usage
    with open("../instance/spacecraft.json", "r") as f:
        txt = f.read()
    print(Spacecraft.model_validate_json(txt))

    print(Spacecraft.model_json_schema())
