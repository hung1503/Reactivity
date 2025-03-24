using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Activitities
{
    public class List
    {
        public class Query : IRequest<Result<PageList<ActivityDto>>> 
        {
            public ActivityParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PageList<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
             private readonly IUserAccesssor _userAccesssor;

            public Handler(DataContext context, IMapper mapper, IUserAccesssor userAccesssor)
            {
                _userAccesssor = userAccesssor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<PageList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                    .Where(d=> d.Date >= request.Params.StartDate)
                    .OrderBy(d => d.Date)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccesssor.GetUsername()})
                    .AsQueryable();

                if(request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Attendees.Any(a => a.Username == _userAccesssor.GetUsername()));
                }

                if(request.Params.IsHost && !request.Params.IsGoing)
                {
                    query = query.Where(x => x.HostUsername == _userAccesssor.GetUsername());
                }
                return Result<PageList<ActivityDto>>.Success(
                    await PageList<ActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}