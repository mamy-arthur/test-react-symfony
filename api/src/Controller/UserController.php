<?php

namespace App\Controller;

use App\Services\UserManager;
use FOS\RestBundle\Controller\ControllerTrait;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;

class UserController
{
    use ControllerTrait;

    public function __construct(protected UserManager $userManager)
    {}

    #[Rest\Get('/users')]
    public function getUsers(): Response
    {
        $users = $this->userManager->getAllUsers();
        return $this->handleView($this->view($users, Response::HTTP_OK));
    }
}