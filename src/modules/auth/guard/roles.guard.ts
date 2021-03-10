import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../user/schema/User';
import UserRepository from '../../user/services/user.repository';


export type ReturnedGuard = boolean | Promise<boolean> | Observable<boolean>

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UserRepository
  ) {}

  canActivate(context: ExecutionContext): ReturnedGuard {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if(!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user: User = request.user
    return this.matchRoles(roles, user)
  }

  async matchRoles(roles: string[], user: User) {
    const verifiedUser = await this.userRepository.findByUsername(user.username)
    if(!verifiedUser) {
      return false
    }

    let hasPermission = false
    const hasRole = () => roles.indexOf(user.role) > -1
    if(hasRole()) {
      hasPermission = true
    }
    return hasPermission
  }
}