from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))

        # Clear existing data
        self.stdout.write('Clearing existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes fighting for fitness!'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='The Justice League of fitness champions!'
        )

        # Create Users (Superheroes)
        self.stdout.write('Creating users...')
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com'},
        ]

        dc_heroes = [
            {'name': 'Superman', 'email': 'clark.kent@dc.com'},
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com'},
            {'name': 'Flash', 'email': 'barry.allen@dc.com'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com'},
        ]

        users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team Marvel'
            )
            users.append(user)

        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team DC'
            )
            users.append(user)

        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing', 'HIIT']
        
        for user in users:
            # Each user gets 5-10 random activities
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(30, 120)  # 30-120 minutes
                calories = duration * random.randint(8, 12)  # calories per minute
                days_ago = random.randint(0, 30)
                activity_date = datetime.now().date() - timedelta(days=days_ago)

                Activity.objects.create(
                    user_id=str(user._id),
                    user_name=user.name,
                    activity_type=activity_type,
                    duration=duration,
                    calories=calories,
                    date=activity_date
                )

        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        for user in users:
            user_activities = Activity.objects.filter(user_id=str(user._id))
            total_calories = sum(activity.calories for activity in user_activities)
            total_activities = user_activities.count()

            Leaderboard.objects.create(
                user_id=str(user._id),
                user_name=user.name,
                team=user.team,
                total_calories=total_calories,
                total_activities=total_activities,
                rank=0  # Will be calculated later
            )

        # Update ranks based on total calories
        leaderboard_entries = Leaderboard.objects.all().order_by('-total_calories')
        for rank, entry in enumerate(leaderboard_entries, start=1):
            entry.rank = rank
            entry.save()

        # Create Workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            {
                'name': 'Super Soldier Training',
                'description': 'Captain America\'s intense full-body workout',
                'difficulty': 'Hard',
                'duration': 60,
                'calories_estimate': 600,
                'category': 'Strength'
            },
            {
                'name': 'Asgardian Thunder Circuit',
                'description': 'Thor\'s hammer-swinging power routine',
                'difficulty': 'Hard',
                'duration': 45,
                'calories_estimate': 550,
                'category': 'Strength'
            },
            {
                'name': 'Web-Slinger Cardio',
                'description': 'Spider-Man\'s agility and endurance workout',
                'difficulty': 'Medium',
                'duration': 30,
                'calories_estimate': 400,
                'category': 'Cardio'
            },
            {
                'name': 'Bat-Cave HIIT',
                'description': 'Batman\'s high-intensity interval training',
                'difficulty': 'Hard',
                'duration': 40,
                'calories_estimate': 500,
                'category': 'HIIT'
            },
            {
                'name': 'Amazon Warrior Training',
                'description': 'Wonder Woman\'s combat-ready workout',
                'difficulty': 'Medium',
                'duration': 50,
                'calories_estimate': 550,
                'category': 'Combat'
            },
            {
                'name': 'Speed Force Sprint',
                'description': 'Flash\'s super-speed running program',
                'difficulty': 'Easy',
                'duration': 25,
                'calories_estimate': 350,
                'category': 'Cardio'
            },
            {
                'name': 'Stark Tech Core',
                'description': 'Iron Man\'s core strengthening routine',
                'difficulty': 'Medium',
                'duration': 35,
                'calories_estimate': 400,
                'category': 'Core'
            },
            {
                'name': 'Atlantean Swimming',
                'description': 'Aquaman\'s underwater endurance training',
                'difficulty': 'Medium',
                'duration': 45,
                'calories_estimate': 450,
                'category': 'Swimming'
            },
            {
                'name': 'Green Lantern\'s Will Power Yoga',
                'description': 'Focus and flexibility training',
                'difficulty': 'Easy',
                'duration': 40,
                'calories_estimate': 250,
                'category': 'Yoga'
            },
            {
                'name': 'Hulk Smash Strength Training',
                'description': 'Maximum power weightlifting routine',
                'difficulty': 'Hard',
                'duration': 55,
                'calories_estimate': 650,
                'category': 'Strength'
            }
        ]

        for workout_data in workouts:
            Workout.objects.create(**workout_data)

        # Print summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete! ==='))
        self.stdout.write(f'Teams created: {Team.objects.count()}')
        self.stdout.write(f'Users created: {User.objects.count()}')
        self.stdout.write(f'Activities created: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts created: {Workout.objects.count()}')
        self.stdout.write(self.style.SUCCESS('\nDatabase successfully populated with superhero test data!'))
