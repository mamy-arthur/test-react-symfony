<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use App\Document\User;
use FOS\RestBundle\Controller\ControllerTrait;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;

class AuthController
{
    use ControllerTrait;

    #[Rest\Post('/login', name: 'app_login')]
    public function login(#[CurrentUser] ?User $user): Response
    {
        if (null === $user) {
            return $this->handleView($this->view([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED));
        }

        return $this->handleView($this->view([
            'user'  => $user->getUserIdentifier(),
            'token' => $this->generateToken($user),
        ]));
    }

    private function generateToken(User $user): string
    {
        // Générer un token JWT ici
        // Vous pouvez utiliser le service Lexik JWT pour générer le token
        // Exemple: $token = $this->jwtManager->create($user);
        return 'your_jwt_token';
    }
}