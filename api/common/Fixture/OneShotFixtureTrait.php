<?php

namespace Common\Fixture;

use Doctrine\Persistence\ObjectManager;
use Psr\Log\LoggerInterface;

trait OneShotFixtureTrait
{
    public function isFixtureAlreadyRun(
        ObjectManager $manager,
        string $fixtureLogClassname
    ): bool {
        $fixturesRepo = $manager->getRepository($fixtureLogClassname);

        $answer = false;

        if (
            $fixturesRepo->findOneBy([
                'fixture' => static::class,
            ])
        ) {
            $answer = true;
        }

        return $answer;
    }

    public function registerFixture(
        ObjectManager $manager,
        string $fixtureLogClassname,
        ?LoggerInterface $logger
    ): void {
        $fixture = new $fixtureLogClassname();
        $fixture->fixture = static::class;

        $logger->info(
            "Fixture '$fixture->fixture' has been run and just been registered.",
        );

        $manager->persist($fixture);
        $manager->flush();
    }
}
