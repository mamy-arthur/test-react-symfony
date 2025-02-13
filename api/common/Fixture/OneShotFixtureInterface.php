<?php


namespace Common\Fixture;


use Doctrine\Persistence\ObjectManager;
use Psr\Log\LoggerInterface;

interface OneShotFixtureInterface
{
    /**
     * @param \Doctrine\Persistence\ObjectManager $manager
     * @param string $fixtureLogClassname
     * @return bool
     */
    public function isFixtureAlreadyRun(ObjectManager $manager, string $fixtureLogClassname): bool;

    /**
     * @param \Doctrine\Persistence\ObjectManager $manager
     * @param string $fixtureLogClassname
     * @param \Psr\Log\LoggerInterface|null $logger
     */
    public function registerFixture(ObjectManager $manager, string $fixtureLogClassname, ?LoggerInterface $logger): void;
}
