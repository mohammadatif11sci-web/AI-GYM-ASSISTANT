from fastapi import APIRouter
from controllers.performance_controller import get_performance_report

router = APIRouter()


@router.get("/performance-report")
def performance_report():

    return get_performance_report()