from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthorOrReadOnly(BasePermission):
    """
    - Anyone can read published blogs (GET, HEAD, OPTIONS).
    - Only authenticated users can create blogs.
    - Only the blog's author can update or delete it.
    """

    def has_permission(self, request, view):
        # Allow read-only access to anyone
        if request.method in SAFE_METHODS:
            return True
        # Write operations require authentication 
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Read is allowed for anyone
        if request.method in SAFE_METHODS:
            return True
        # Write is allowed only to the blog's author
        return obj.author == request.user
