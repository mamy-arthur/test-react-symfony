<?php

namespace App\DataFixtures;

use App\Document\FixtureLog;
use App\Document\User;
use Common\Fixture\OneShotFixtureInterface;
use Common\Fixture\OneShotFixtureTrait;
use Doctrine\Bundle\MongoDBBundle\Fixture\Fixture;
use Doctrine\Persistence\ObjectManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture implements OneShotFixtureInterface
{
    use OneShotFixtureTrait;

    public function __construct(private UserPasswordHasherInterface $passwordHasher, private LoggerInterface $logger)
    {}

    public function load(ObjectManager $manager): void
    {
        $fixtureName = self::class;

        if ($this->isFixtureAlreadyRun($manager, FixtureLog::class)) {
            $this->logger->warning(
                "The fixture current '$fixtureName' has already been registered, it won't be executed then.",
            );
            return;
        }

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

        $this->logger->info('Fixture done.');

        $this->registerFixture($manager, FixtureLog::class, $this->logger);
    }
}