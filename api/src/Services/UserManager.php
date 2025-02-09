<?php

namespace App\Services;

use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;

class UserManager
{
    public function __construct(protected DocumentManager $documentManager)
    {}

    public function getAllUsers()
    {
        $users = $this->documentManager->getRepository(User::class)->findAll();
        return array_map(function($user) {
            return [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles(),
            ];
        }, $users);
    }
}