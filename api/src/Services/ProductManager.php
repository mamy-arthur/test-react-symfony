<?php

namespace App\Services;

use App\Document\Product;
use Doctrine\ODM\MongoDB\DocumentManager;

class ProductManager
{
    public function __construct(protected DocumentManager $documentManager)
    {}

    public function findAll()
    {
        return $this->documentManager->getRepository(Product::class)->findAll();
    }

    public function createProduct(array $data)
    {
        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice((float) $data['price']);
        $product->setQuantity((int) $data['quantity']);
        $this->documentManager->persist($product);
        $this->documentManager->flush();
    }

    public function updateProduct(Product $product, array $data)
    {
        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            $product->setPrice((float)$data['price']);
        }
        if (isset($data['quantity'])) {
            $product->setQuantity((int)$data['quantity']);
        }
        $this->documentManager->flush();
    }

    public function deleteProduct(Product $product)
    {
        $this->documentManager->remove($product);
        $this->documentManager->flush();
    }
}