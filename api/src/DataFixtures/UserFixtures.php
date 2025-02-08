<?php

namespace App\DataFixtures;

use App\Document\User;
use Doctrine\Bundle\MongoDBBundle\Fixture\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {}

    public function load(ObjectManager $manager): void
    {
        $admin = new User();
        $admin->setEmail('admin@app.ad');
        $admin->setPassword($this->passwordHasher->hashPassword($admin, 'Something1234#'));
        $admin->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin);

        $user = new User();
        $user->setEmail('user@app.ad');
        $user->setPassword($this->passwordHasher->hashPassword($user, 'User1234#'));
        $user->setRoles(['ROLE_USER']);
        $manager->persist($user);

        $manager->flush();
    }
}