<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\Document(collection: "fixtures")]
class FixtureLog
{
    #[MongoDB\Id]
    public string $id;

    #[MongoDB\Field(type: 'int')]
    public ?int $version = 1;

    #[MongoDB\Field(type: 'string')]
    public string $fixture;
}