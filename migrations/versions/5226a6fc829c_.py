"""empty message

Revision ID: 5226a6fc829c
Revises: 3f7d39230a59
Create Date: 2018-02-09 21:28:11.941286

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5226a6fc829c'
down_revision = '3f7d39230a59'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Profile', sa.Column('name', sa.String(length=200), nullable=False))
    op.alter_column('Profile', 'host',
               existing_type=sa.VARCHAR(length=200),
               nullable=False)
    op.create_unique_constraint(None, 'Profile', ['name'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'Profile', type_='unique')
    op.alter_column('Profile', 'host',
               existing_type=sa.VARCHAR(length=200),
               nullable=True)
    op.drop_column('Profile', 'name')
    # ### end Alembic commands ###
