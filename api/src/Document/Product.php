<?php

namespace App\Document;

use App\Repository\ProductRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\Document(collection: "products", repositoryClass: ProductRepository::class)]
class Product
{
    #[MongoDB\Id]
    private $id;

    #[MongoDB\Field(type: "string")]
    private $name;

    #[MongoDB\Field(type: "string")]
    private $description;

    #[MongoDB\Field(type: "float")]
    private $price;

    #[MongoDB\Field(type: "int")]
    private $quantity;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setName(string $name) : void
    {
        $this->name = $name;
    }

    public function setDescription(string $description) : void
    {
        $this->description = $description;
    }

    public function setPrice(float $price) : void
    {
        $this->price = $price;
    }

    public function setQuantity(int $quantity) : void
    {
        $this->quantity = $quantity;
    }
}
