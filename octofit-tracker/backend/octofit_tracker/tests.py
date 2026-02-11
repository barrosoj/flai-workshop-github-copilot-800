from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, date


class UserModelTest(TestCase):
    """Test cases for User model"""

    def setUp(self):
        self.user = User.objects.create(
            name='Test Hero',
            email='test@hero.com',
            team='Test Team'
        )

    def test_user_creation(self):
        """Test that a user can be created"""
        self.assertEqual(self.user.name, 'Test Hero')
        self.assertEqual(self.user.email, 'test@hero.com')
        self.assertEqual(self.user.team, 'Test Team')

    def test_user_str(self):
        """Test the string representation of user"""
        self.assertEqual(str(self.user), 'Test Hero')


class TeamModelTest(TestCase):
    """Test cases for Team model"""

    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='A test team'
        )

    def test_team_creation(self):
        """Test that a team can be created"""
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(self.team.description, 'A test team')

    def test_team_str(self):
        """Test the string representation of team"""
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTest(TestCase):
    """Test cases for Activity model"""

    def setUp(self):
        self.activity = Activity.objects.create(
            user_id='123',
            user_name='Test Hero',
            activity_type='Running',
            duration=60,
            calories=500,
            date=date.today()
        )

    def test_activity_creation(self):
        """Test that an activity can be created"""
        self.assertEqual(self.activity.user_name, 'Test Hero')
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 60)
        self.assertEqual(self.activity.calories, 500)


class LeaderboardModelTest(TestCase):
    """Test cases for Leaderboard model"""

    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_id='123',
            user_name='Test Hero',
            team='Test Team',
            total_calories=1000,
            total_activities=5,
            rank=1
        )

    def test_leaderboard_creation(self):
        """Test that a leaderboard entry can be created"""
        self.assertEqual(self.leaderboard.user_name, 'Test Hero')
        self.assertEqual(self.leaderboard.total_calories, 1000)
        self.assertEqual(self.leaderboard.rank, 1)


class WorkoutModelTest(TestCase):
    """Test cases for Workout model"""

    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout',
            difficulty='Medium',
            duration=45,
            calories_estimate=400,
            category='Cardio'
        )

    def test_workout_creation(self):
        """Test that a workout can be created"""
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.difficulty, 'Medium')
        self.assertEqual(self.workout.duration, 45)


class UserAPITest(APITestCase):
    """Test cases for User API endpoints"""

    def setUp(self):
        self.user = User.objects.create(
            name='API Test Hero',
            email='api@test.com',
            team='API Team'
        )

    def test_get_users_list(self):
        """Test retrieving list of users"""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


class TeamAPITest(APITestCase):
    """Test cases for Team API endpoints"""

    def setUp(self):
        self.team = Team.objects.create(
            name='API Test Team',
            description='API test team description'
        )

    def test_get_teams_list(self):
        """Test retrieving list of teams"""
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


class ActivityAPITest(APITestCase):
    """Test cases for Activity API endpoints"""

    def setUp(self):
        self.activity = Activity.objects.create(
            user_id='123',
            user_name='Test Hero',
            activity_type='Running',
            duration=60,
            calories=500,
            date=date.today()
        )

    def test_get_activities_list(self):
        """Test retrieving list of activities"""
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


class LeaderboardAPITest(APITestCase):
    """Test cases for Leaderboard API endpoints"""

    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_id='123',
            user_name='Test Hero',
            team='Test Team',
            total_calories=1000,
            total_activities=5,
            rank=1
        )

    def test_get_leaderboard_list(self):
        """Test retrieving leaderboard"""
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_leaderboard_ordering(self):
        """Test that leaderboard is ordered by rank"""
        # Create another entry
        Leaderboard.objects.create(
            user_id='456',
            user_name='Another Hero',
            team='Another Team',
            total_calories=800,
            total_activities=3,
            rank=2
        )
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # First entry should have rank 1
        self.assertEqual(response.data[0]['rank'], 1)


class WorkoutAPITest(APITestCase):
    """Test cases for Workout API endpoints"""

    def setUp(self):
        self.workout = Workout.objects.create(
            name='API Test Workout',
            description='API test workout description',
            difficulty='Medium',
            duration=45,
            calories_estimate=400,
            category='Cardio'
        )

    def test_get_workouts_list(self):
        """Test retrieving list of workouts"""
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
