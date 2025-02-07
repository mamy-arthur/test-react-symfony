<?php

namespace App\Repository;

use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

class ProductRepository extends DocumentRepository
{
    public function findAllProducts()
    {
        return $this->findAll();
    }
}