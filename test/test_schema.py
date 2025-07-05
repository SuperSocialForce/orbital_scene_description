import pytest
from pathlib import Path

import json
from jsonschema import validators
from referencing import Registry, Resource

ROOT_DIR = Path(__file__).parent.parent


@pytest.fixture
def registry():
    with open(ROOT_DIR / "schema" / "types.json") as f:
        types = json.load(f)
    return Registry().with_resource("types.json", Resource.from_contents(types))


def test_scene_description_schema(registry):
    instance_files = list((ROOT_DIR / "instance").glob("*.json"))
    for file in instance_files:
        # Load the JSON instance
        with open(file) as f:
            instance = json.load(f)

        # Load the JSON schema
        with open(ROOT_DIR / "schema" / file.name) as f:
            schema = json.load(f)

        # Validate the instance against the schema
        validator_cls = validators.validator_for(schema)
        validator = validator_cls(schema, registry=registry)
        validator.validate(instance)
