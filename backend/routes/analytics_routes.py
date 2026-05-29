from fastapi import APIRouter

from controllers.analytics_controller import get_dashboard_stats

router = APIRouter()

@router.get("/dashboard-stats")

def dashboard_stats():

    return get_dashboard_stats()