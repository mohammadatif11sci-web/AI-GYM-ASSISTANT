from fastapi import APIRouter

from controllers.admin_controller import (
    get_admin_stats
)

router = APIRouter()


@router.get("/admin-stats")

def admin_stats():

    return get_admin_stats()