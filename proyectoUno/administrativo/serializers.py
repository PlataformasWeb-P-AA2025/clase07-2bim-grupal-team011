from django.contrib.auth.models import User, Group
from administrativo.models import Estudiante, NumeroTelefonico
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class NumeroTelefonicoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NumeroTelefonico
        fields = ['id', 'url', 'telefono', 'tipo', 'estudiante']

class EstudianteSerializer(serializers.HyperlinkedModelSerializer):
    telefonos = NumeroTelefonicoSerializer(
        many=True, 
        read_only=True, 
        source="numeros_telefonicos"  # Usa el related_name de tu ForeignKey aquí si tienes uno personalizado, por ejemplo "telefonos"
    )

    class Meta:
        model = Estudiante
        fields = ['id', 'url', 'nombre', 'apellido', 'cedula', 'correo', 'telefonos']
